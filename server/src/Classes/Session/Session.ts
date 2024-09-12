import {
	AssignedCharacter,
	IPlayer,
} from "@shared/types/Game/PlayerService/Player";
import { BaseController } from "../../types/GameController/Controllers";
import { GameClass } from "../Game/Game";
import { GameController } from "../GameController/GameController";
import {
	SessionBasicInfo,
	SessionData,
	SessionRenderData,
} from "@shared/types/Session/Session";
import { PLAYER_COLOR } from "@shared/types/Game/PLAYER_COLOR";
import { uuid } from "uuidv4";
import { CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { CHARACTER, Gender } from "@shared/types/Game/Characters/Character";
import { SessionSettings } from "@shared/types/SessionSettings";
import { IUser } from "../../types/UserData/IUser";
import { Player, UserPlaceHolder } from "../Player/Player";
import { io } from "../../../server";
import {
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { isPlayer } from "../../utils/isPlayer";
import { ChatService } from "../ChatService/ChatService";
import {
	IChatService,
	SYSTEM_MSG,
} from "@shared/types/ChatService/ChatService";
import { getDuplicatedElements } from "@shared/utils/getDuplicatedElements";
import { GAME_STATUS } from "@shared/types/Game/Game";
import { SaveService } from "../SaveService/SaveService";
import { SaveGameDocument } from "../../Models/SaveGame";
import { isUser } from "../../utils/TypeGuards/isUser";
import { SessionConnectError } from "../../Errors/Session/SessionConnectError";
import { SESSION_CONNECTION_ERROR_CODE } from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import { ISessionService } from "../../types/SessionService/SessionService";
import { config } from "../../config/config";

export class Session implements SessionData {
	private _players: IPlayer[] = [];
	private _gameController: BaseController | null = null;
	private _colors: PLAYER_COLOR[] = Object.values(PLAYER_COLOR);
	private _id = uuid();
	private _characters: CHARACTER[] = Object.values(CHARACTER);
	private _settings: SessionSettings;
	private _host: IUser;
	private _chatService: IChatService = new ChatService(this);

	private readonly _sendLatencyInterval: NodeJS.Timeout;
	private readonly _saveService = new SaveService(this);

	private _loadData: SaveGameDocument | null = null;
    private _invitationCode: string;

	constructor(
        sessionService: ISessionService,
		host: IUser,
		settings: SessionSettings,
		loadData?: SaveGameDocument
	) {
		this._settings = settings;
		if (loadData) {
			this._loadData = loadData;
			this.loadSessionData(loadData);
		}
        this._invitationCode = sessionService.generateUniqueInvitationCode();
		this._host = host;
		this.joinSession(host, Boolean(loadData));
		this._sendLatencyInterval = setInterval(() => {
			this.sendLatencyListToAllPlayers();
		}, config.ping.sendLatencyFrequency);
	}

	public getRenderData(userId: string): SessionRenderData {
		return {
			id: this._id,
			invitationCode: this._invitationCode,
			settings: this._settings,
			players: this._players.map((player) => player.renderData),
			game: this.gameController?.game.renderData || null,
			localPlayer: this.getPlayerByUserId(userId).renderData,
			hostPlayer: this.getPlayerByUserId(this._host.id).renderData,
			chatService: this.chatService.renderData,
			loadMode: this.isLoadMode,
		};
	}

	get visible() {
		return !this._settings.private && !this.isGameInProgress;
	}

	get gameStatus() {
		if (this._gameController?.game) {
			return this._gameController.game.gameStatus;
		} else {
			return GAME_STATUS.IN_LOBBY;
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

	get usersInSession() {
		return this._players.reduce((accumulator, current) => {
			return current.isPlaceHolder ? accumulator : accumulator + 1;
		}, 0);
	}

    get invitationCode() {
        return this._invitationCode
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
			usersInSession: this.usersInSession,
		};
	}

	public handleAction(
		userId: string,
		action: CONTROLLER_ACTION,
		...args: any[]
	): void {
		const player = this.getPlayerByUserId(userId);
		this._gameController?.handleAction(action, player, ...args);
		this._saveService.saveAction(userId, action, args);
	}

	public joinSession(user: IUser, load: boolean) {
        if (load && !this.usersPlayerExist(user.id)) {
            throw new SessionConnectError("user doesn't exist in save game", 
                SESSION_CONNECTION_ERROR_CODE.ACCESS_DENIED)
        }
		if (this.usersPlayerExist(user.id)) {
			this.getPlayerByUserId(user.id).setUser(user);
		} else {
			this.addNewPlayer(user);
		}
		user.addActiveSession(this);
		this.addJoinMessage(user.username);
		console.log(this.getPlayerByUserId(user.id));
	}

	public leaveSession(user: IUser) {

		const player = this.getPlayerByUserId(user.id);
		if (this._host === player.user && this.usersInSession > 1) {
			this.changeHost();
		}
		if (this.isLoadMode || this.isGameInProgress) {
			player.unsetUser();
		} else {
			user.removeSession(this._id);
			this.removePlayer(player.id);
		}

		this.addLeaveMessage(player.username);
	}

	public startGame(): BaseController {
		const loadData = this._loadData
			? {
					seed: this._loadData.seed,
					id: this._loadData.gameId,
			  }
			: undefined;
		const game = new GameClass(this._players);
		const gameController = new GameController(game, this._players);
		this._gameController = gameController;
		this._chatService.clearSystemMessages();
		if (this._loadData) {
			this._gameController.loadBySteps(this._loadData.playerActions);
		}

		return gameController;
	}

	public assignColor(userId: string, color: PLAYER_COLOR): void {
		this.getPlayerByUserId(userId).assignColor(color);
	}

	public assignCharacter(
		userId: string,
		character: CHARACTER,
		gender: Gender
	) {
		this.getPlayerById(userId).assignCharacter({ char: character, gender });
	}

	public changeCharacter(
		userId: string,
		character: Partial<AssignedCharacter>
	) {
		const player = this.getPlayerByUserId(userId);
		player.assignCharacter({
			...player.assignedCharacter,
			...character,
		});
	}

	public isHost(userId: string) {
		return this._host.id === userId;
	}

	public canStart() {
		const duplicated =
			getDuplicatedElements(
				this._players.map((player) => player.assignedCharacter.char)
			).length > 0;
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
		if (isUser(player.user) && !this.isGameInProgress && !this.isLoadMode) {
			this.leaveSession(player.user);
		}
	}

	public addMessage(userId: string, message: string) {
		const player = this.getPlayerByUserId(userId);
		this._chatService.addMsg(player.username, message);
	}

	public updateSettings(settings: Partial<SessionSettings>) {
		if (!this.isLoadMode) {
			this._settings = {
				...this._settings,
				...settings,
			};
		}
	}


	public onSessionRemove() {
		clearInterval(this._sendLatencyInterval);
	}

	public async save() {
		const game = this.getGame();
		if (game) {
			return this._saveService.saveGame(game);
		} else {
			throw new Error("No game to save!");
		}
	}

	private changeHost() {
		this._host = this.findNextAvailableHost();
	}

	private findNextAvailableHost(): IUser {
		const current = this.getPlayerByUserId(this._host.id);
		const startIndex = this.players.indexOf(current);

		if (startIndex === -1) {
			throw new Error("Host not found in the players list");
		}

		const totalPlayers = this.players.length;

		for (let i = 1; i < totalPlayers; i++) {
			const index = (startIndex + i) % totalPlayers;
			const candidate = this.players[index];

			if (candidate && isUser(candidate.user)) {
				return candidate.user;
			}
		}

		throw new Error("Can't find next available host");
	}

	private addNewPlayer(user: IUser) {
		const player = new Player(
			user,
			{
				gender: "male",
				char: this.getUnassignedCharacter(),
			},
			this.findAvailableColor(),
			user.username
		);
		this._players.push(player);
	}

	private getUnassignedCharacter(): CHARACTER {
		const char = this._characters.find(
			(char) => !this.isCharacterTaken(char)
		);
		if (!char) {
			throw new Error("No more unassigned characters.");
		}
		return char;
	}

	public getPlayerByUserId(userId: string): IPlayer {
		const player = this._players.find(
			(player) => player.user.id === userId
		);
		if (!player) {
			throw new Error(
				`Can't find player that belongs to user with id: ${userId}`
			);
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
		});
		if (!searched) {
			throw new Error("There isn't any color available!");
		}
		return searched;
	}

	private isColorTaken(color: PLAYER_COLOR) {
		return this._players.some((player) => player.color === color);
	}

	private isCharacterTaken(character: CHARACTER) {
		return this._players.some(
			(player) => player.assignedCharacter?.char === character
		);
	}

	private sendLatencyListToAllPlayers() {
		const list = this._players.map((player) => ({
			playerId: player.id,
			latency: isUser(player.user) ? player.user.latency : null,
		}));
		io.to(this.id).emit(SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT, {
			list,
		});
	}

	private addJoinMessage(playerName: string) {
		this._chatService.addSystemMsg(
			SYSTEM_MSG.PLAYER_HAS_JOINED_SESSION,
			playerName
		);
	}

	private addLeaveMessage(playerName: string) {
		this._chatService.addSystemMsg(
			SYSTEM_MSG.PLAYER_HAS_LEFT_SESSION,
			playerName
		);
	}

	private loadSessionData(saveGame: SaveGameDocument) {
		try {
			this._players = saveGame.players.map((player) => {
				return new Player(
					{ username: player.username, id: player.userId },
					player.assignedCharacter,
					player.color,
					player.username
				);
			});

			this._settings = saveGame.sessionSettings;
			this._loadData = saveGame;
            this.chatService.addSystemMsg(SYSTEM_MSG.ONLY_PRESENT_PLAYERS_CAN_JOIN, "");
		} catch (e) {
			console.warn(e);
		}
	}


	public isUserInSession(userId: string): boolean {
		return this._players.some(
			(player) => player.user.id === userId && !player.isPlaceHolder
		);
	}

    public usersPlayerExist(userId: string) {
        return this._players.some((player) => player.user.id === userId);
    }

	private removePlayer(playerId: string) {
		this._players = this._players.filter((player) => player.id !== playerId);
	}
}
