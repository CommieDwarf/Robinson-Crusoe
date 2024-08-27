import {AssignedCharacter, IPlayer} from "@shared/types/Game/PlayerService/Player";
import {BaseController} from "../../types/GameController/Controllers";
import {GameClass} from "../Game/Game";
import {GameController} from "../GameController/GameController";
import {SessionBasicInfo, SessionData, SessionRenderData} from "@shared/types/Session/Session";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {uuid} from "uuidv4";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {SessionSettings} from "@shared/types/SessionSettings";
import {IUser} from "../../types/UserData/IUser";
import {Player} from "../Player/Player";
import {io} from "../../../server";
import {SOCKET_EVENT_CLIENT, SOCKET_EVENT_SERVER} from "@shared/types/Requests/Socket";
import {isPlayer} from "../../utils/isPlayer";
import {ChatService} from "../ChatService/ChatService";
import {IChatService, SYSTEM_MSG} from "@shared/types/ChatService/ChatService";
import {getDuplicatedElements} from "@shared/utils/getDuplicatedElements";
import {GAME_STATUS} from "@shared/types/Game/Game";
import {SEND_LATENCY_FREQUENCY} from "../../config/connection";
import {SaveService} from "../SaveService/SaveService";
import {SaveGameDocument} from "../../Models/SaveGame";
import {isUser} from "../../utils/TypeGuards/isUser";

export class Session implements SessionData {


    private _players: IPlayer[] = [];
    private _gameController: BaseController | null = null;
    private _colors: PLAYER_COLOR[] = Object.values(PLAYER_COLOR);
    private _id = uuid();
    private _connectCode = uuid();
    private _characters: CHARACTER[] = Object.values(CHARACTER);
    private _settings: SessionSettings;
    private _host: IUser;
    private _singleplayer: boolean;
    private _chatService: IChatService = new ChatService(this);
    private _loadMode = false;

    private readonly _sendLatencyInterval: NodeJS.Timeout;
    private readonly _saveService = new SaveService(this);

    private _loadData: SaveGameDocument | null = null;

    constructor(host: IUser,
                settings: SessionSettings,
                singleplayer = false,
                loadData?: SaveGameDocument) {
        this._settings = settings;
        if (loadData) {
            this._loadData = loadData;
            this.loadSessionData(loadData);
        }
        this._host = host;
        this.joinSession(host, Boolean(loadData))
        this._singleplayer = singleplayer;
        this._sendLatencyInterval = setInterval(() => {
            this.sendLatencyListToAllPlayers()
        }, SEND_LATENCY_FREQUENCY)
    }

    public getRenderData(userId: string): SessionRenderData {
        return {
            id: this._id,
            connectCode: this._connectCode,
            settings: this._settings,
            players: this._players.map((player) => player.renderData),
            game: this.gameController?.game.renderData || null,
            localPlayer: this.getPlayerByUserId(userId).renderData,
            hostPlayer: this.getPlayerByUserId(this._host.id).renderData,
            chatService: this.chatService.renderData,
        }
    }

    get gameStatus() {
        if (this._gameController?.game) {
            return this._gameController.game.gameStatus;
        } else {
            return GAME_STATUS.IN_LOBBY
        }
    }

    get players() {
        return this._players;
    }

    get gameController(): BaseController | null {
        return this._gameController;
    }

    get id(): any {
        return this._id;
    }

    get settings(): SessionSettings {
        return this._settings;
    }

    get host(): IUser {
        return this._host;
    }

    get isGameInProgress() {
        return Boolean(this._gameController?.game);
    }

    get chatService(): IChatService {
        return this._chatService;
    }

    get isLoadMode(): boolean {
        return Boolean(this._loadData);
    }


    public getBasicInfo(): SessionBasicInfo {
        return {
            name: this._settings.name,
            host: this._host.username,
            players: this._players.length,
            maxPlayers: this._settings.maxPlayers,
            scenario: this._settings.scenario,
            password: !!this._settings.password,
            id: this._id,
        }
    }

    public handleAction(userId: string, action: CONTROLLER_ACTION, ...args: any[]): void {
        const player = this.getPlayerByUserId(userId);
        this._gameController?.handleAction(action, player, ...args);
        this._saveService.saveAction(userId, action, args);
    }

    public joinSession(user: IUser, load: boolean) {
        if (load) {
            this.getPlayerByUserId(user.id).setUser(user);
        } else {
            this.addNewPlayer(user);
        }
        user.addActiveSession(this);
        this.addJoinMessage(user.username);
    }

    public leaveSession(user: IPlayer | IUser) {
        let player = user;
        if (!isPlayer(player)) {
            const searched = this._players.find((pl) => pl.user!.id === user.id);
            if (!searched) {
                return;
            } else {
                player = searched;
            }
        }
        this.addLeaveMessage(player.username);
        this._players = this._players.filter((pl) => pl !== player);
    }

    public startGame(): BaseController {
        const loadData = this._loadData ? {
            seed: this._loadData.seed,
            id: this._loadData.gameId
        } : undefined;
        const game = new GameClass(this._players);
        const gameController = new GameController(game, this._players);
        this._gameController = gameController
        this._chatService.clearSystemMessages();
        if (this._loadData) {
            this._gameController.loadBySteps(this._loadData.playerActions);
        }

        return gameController;
    }

    public assignColor(userId: string, color: PLAYER_COLOR): void {
        this.getPlayerByUserId(userId).assignColor(color);
    }

    public assignCharacter(userId: string, character: CHARACTER, gender: Gender) {
        this.getPlayerById(userId).assignCharacter({char: character, gender});
    }

    public changeCharacter(userId: string, character: Partial<AssignedCharacter>) {
        const player = this.getPlayerByUserId(userId)
        player.assignCharacter({
            ...player.assignedCharacter,
            ...character,
        })
    }

    public isHost(userId: string) {
        return this._host.id === userId;
    }

    public canStart() {
        const duplicated = getDuplicatedElements(this._players
            .map((player) => player.assignedCharacter.char)).length > 0;
        const allReady = this._players.every((player) => player.ready);

        return !duplicated && allReady;
    }


    public getGame() {
        return this._gameController?.game;
    }

    public setPlayerReady(userId: string, ready: boolean) {
        this.getPlayerByUserId(userId).ready = ready;
    }

    public kickPlayer(playerId: string) {
        const player = this.getPlayerById(playerId);
        this.leaveSession(player);
    }

    public addMessage(userId: string, message: string) {
        const player = this.getPlayerByUserId(userId);
        this._chatService.addMsg(player.username, message);
    }

    public updateSettings(settings: Partial<SessionSettings>) {
        this._settings = {
            ...this._settings,
            ...settings
        }
    }

    public closeSession() {
        clearInterval(this._sendLatencyInterval);
    }

    public async save() {
        const game = this.getGame();
        if (game) {
            const result = await this._saveService.saveGame(game);
        }
    }


    private addNewPlayer(user: IUser) {
        const player = new Player(user, {
                gender: "male",
                char: this.getUnassignedCharacter(),
            },
            this.findAvailableColor(),
            user.username
        )
        this._players.push(player);
    }


    private getUnassignedCharacter(): CHARACTER {
        const char = this._characters.find((char) => !this.isCharacterTaken(char));
        if (!char) {
            throw new Error("No more unassigned characters.")
        }
        return char
    }


    private getPlayerByUserId(userId: string): IPlayer {
        const player = this._players.find((player) => player.user.id === userId);
        if (!player) {
            throw new Error(`Can't find player that belongs to user with id: ${userId}`);
        }
        return player;
    }

    private getPlayerById(playerId: string): IPlayer {
        const player = this._players.find((player) => player.id === playerId);
        if (!player) {
            throw new Error(`Can't find player with id: ${playerId}`);
        }
        return player;
    }

    private findAvailableColor(): PLAYER_COLOR {
        let searched;
        this._colors.forEach((color) => {
            if (!this.isColorTaken(color)) {
                searched = color;
            }
        })
        if (!searched) {
            throw new Error("There isn't any color available!");
        }
        return searched;
    }


    private isColorTaken(color: PLAYER_COLOR) {
        return this._players.some((player) => player.color === color);
    }

    private isCharacterTaken(character: CHARACTER) {
        return this._players.some((player) => player.assignedCharacter?.char === character)
    }

    private sendLatencyListToAllPlayers() {
        const list = this._players.map((player) => ({
            playerId: player.id,
            latency: isUser(player.user) ? player.user.latency : null
        }))
        io.to(this.id).emit(SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT, {list});
    }

    private addJoinMessage(playerName: string) {
        this._chatService.addSystemMsg(SYSTEM_MSG.PLAYER_HAS_JOINED_SESSION, playerName);
    }

    private addLeaveMessage(playerName: string) {
        this._chatService.addSystemMsg(SYSTEM_MSG.PLAYER_HAS_LEFT_SESSION, playerName);
    }


    private loadSessionData(saveGame: SaveGameDocument) {
        try {
            this._players = saveGame.players
                .map((player) => {
                    return new Player({username: player.username, id: player.userId},
                        player.assignedCharacter,
                        player.color,
                        player.username
                    )
                })

            // this._settings = saveGame.sessionSettings;
            this._loadData = saveGame;
        } catch (e) {
            console.warn(e)
        }
    }


    isUserInSession(userId: string): boolean {
        return this._players.some((player) => player.user.id === userId);
    }
}
