import {AssignedCharacter, IPlayer} from "@shared/types/Game/PlayerService/Player";
import {BaseController} from "../../types/GameController/Controllers";
import {GameClass} from "../Game/Game";
import {GameController} from "../GameController/GameController";
import {SessionBasicInfo, SessionData, SessionRenderData} from "@shared/types/Session/Session";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {uuid} from "uuidv4";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {SessionSettings} from "@shared/types/SessionSettings";
import {IUser} from "../../types/UserData/IUser";
import {Player} from "../Player/Player";
import {io} from "../../../server";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {isPlayer} from "../../utils/isPlayer";
import {ChatService} from "../ChatService/ChatService";
import {IChatService} from "@shared/types/ChatService/ChatService";
import {getDuplicatedElements} from "@shared/utils/getDuplicatedElements";


export class Session implements SessionData {


    private _players: IPlayer[] = [];
    private _gameController: BaseController | null = null;
    private _colors: PAWN_COLOR[] = Object.values(PAWN_COLOR);
    private _id = uuid();
    private _connectCode = uuid();
    private _characters: CHARACTER[] = Object.values(CHARACTER);
    private _settings: SessionSettings;
    private _host: IUser;
    private _singleplayer: boolean;
    private _chatService: IChatService = new ChatService(this);

    constructor(host: IUser, settings: SessionSettings, singleplayer = false) {
        this._settings = settings;
        this.joinSession(host);
        this._host = host;
        this._singleplayer = singleplayer;
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
    }

    public joinSession(user: IUser) {
        const player = new Player(user,
            {
                gender: "male",
                char: this.getUnassignedCharacter()
            });
        this._players.push(player);
        this.assignColor(player.id, this.findAvailableColor());
        this.assignCharacter(player.id, CHARACTER.SOLDIER, "male");
        this.pingPlayer(player);
        user.addActiveSession(this);
    }

    public leaveSession(user: IPlayer | IUser) {
        let player = user;
        if (!isPlayer(player)) {
            const searched = this._players.find((pl) => pl.user.id === user.id);
            if (!searched) {
                return;
            } else {
                player = searched;
            }
        }
        player.clearPingIntervals();
        this._players = this._players.filter((pl) => pl !== player);
        console.log("leaving session!");
        io.to(this.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
    }

    public startGame(): BaseController {
        // throw new Error("STARTING GAME")
        const game = new GameClass(this._players);
        const gameController = new GameController(game, this._players);
        this._gameController = gameController
        return gameController;
    }

    public assignColor(userId: string, color: PAWN_COLOR): void {
        if (!this.isColorTaken(color)) {
            this.getPlayerById(userId).assignColor(color);
        }
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


    private pingPlayer(player: IPlayer) {
        player.ping((latency) => {
            const payload: SocketPayloadMap[SOCKET_EMITTER.PLAYER_LATENCY_SENT] = {
                playerId: player.id,
                latency
            }
            io.to(this.id).emit(SOCKET_EMITTER.PLAYER_LATENCY_SENT, payload)
        }, () => {
            // if (!this.isGameInProgress) {
            //     this.leaveSession(player)
            //     io.to(this.id).emit(SOCKET_EMITTER.SESSION_CHANGED, {});
            // } else {
            // }
        }, this.id)
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

    private findAvailableColor(): PAWN_COLOR {
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


    private isColorTaken(color: PAWN_COLOR) {
        return this._players.some((player) => player.color === color);
    }

    private isCharacterTaken(character: CHARACTER) {
        return this._players.some((player) => player.assignedCharacter?.char === character)
    }

    isUserInSession(userId: string): boolean {
        return this._players.some((player) => player.user.id === userId);
    }
}
