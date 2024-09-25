"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const Game_1 = require("../Game/Game");
const GameController_1 = require("../GameController/GameController");
const PLAYER_COLOR_1 = require("@shared/types/Game/PLAYER_COLOR");
const uuidv4_1 = require("uuidv4");
const Character_1 = require("@shared/types/Game/Characters/Character");
const Player_1 = require("../Player/Player");
const server_1 = require("../../../server");
const Socket_1 = require("@shared/types/Requests/Socket");
const ChatService_1 = require("../ChatService/ChatService");
const ChatService_2 = require("@shared/types/ChatService/ChatService");
const getDuplicatedElements_1 = require("@shared/utils/getDuplicatedElements");
const Game_2 = require("@shared/types/Game/Game");
const SaveService_1 = require("../SaveService/SaveService");
const isUser_1 = require("../../utils/TypeGuards/isUser");
const SessionConnectError_1 = require("../../Errors/Session/SessionConnectError");
const SESSION_CONNECTION_ERROR_CODE_1 = require("@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE");
const config_1 = require("../../config/config");
class Session {
    constructor(sessionService, host, settings, loadData) {
        this._players = [];
        this._gameController = null;
        this._colors = Object.values(PLAYER_COLOR_1.PLAYER_COLOR);
        this._id = (0, uuidv4_1.uuid)();
        this._characters = Object.values(Character_1.CHARACTER);
        this._chatService = new ChatService_1.ChatService(this);
        this._saveService = new SaveService_1.SaveService(this);
        this._loadData = null;
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
        }, config_1.config.ping.sendLatencyFrequency);
    }
    getRenderData(userId) {
        var _a;
        return {
            id: this._id,
            invitationCode: this._invitationCode,
            settings: this._settings,
            players: this._players.map((player) => player.renderData),
            game: ((_a = this.gameController) === null || _a === void 0 ? void 0 : _a.game.renderData) || null,
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
        var _a;
        if ((_a = this._gameController) === null || _a === void 0 ? void 0 : _a.game) {
            return this._gameController.game.gameStatus;
        }
        else {
            return Game_2.GAME_STATUS.IN_LOBBY;
        }
    }
    get players() {
        return this._players;
    }
    get gameController() {
        return this._gameController;
    }
    get id() {
        return this._id;
    }
    get settings() {
        return this._settings;
    }
    get host() {
        return this._host;
    }
    get isGameInProgress() {
        var _a;
        return Boolean((_a = this._gameController) === null || _a === void 0 ? void 0 : _a.game);
    }
    get chatService() {
        return this._chatService;
    }
    get isLoadMode() {
        return Boolean(this._loadData);
    }
    get usersInSession() {
        return this._players.reduce((accumulator, current) => {
            return current.isPlaceHolder ? accumulator : accumulator + 1;
        }, 0);
    }
    get invitationCode() {
        return this._invitationCode;
    }
    getBasicInfo() {
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
    handleAction(userId, action, ...args) {
        var _a;
        const player = this.getPlayerByUserId(userId);
        (_a = this._gameController) === null || _a === void 0 ? void 0 : _a.handleAction(action, player, ...args);
        this._saveService.saveAction(userId, action, args);
    }
    joinSession(user, load) {
        if (load && !this.usersPlayerExist(user.id)) {
            throw new SessionConnectError_1.SessionConnectError("user doesn't exist in save game", SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.ACCESS_DENIED);
        }
        if (this.usersPlayerExist(user.id)) {
            this.getPlayerByUserId(user.id).setUser(user);
        }
        else {
            this.addNewPlayer(user);
        }
        user.addActiveSession(this);
        this.addJoinMessage(user.username);
        console.log(this.getPlayerByUserId(user.id));
    }
    leaveSession(user) {
        const player = this.getPlayerByUserId(user.id);
        if (this._host === player.user && this.usersInSession > 1) {
            this.changeHost();
        }
        if (this.isLoadMode || this.isGameInProgress) {
            player.unsetUser();
        }
        else {
            user.removeSession(this._id);
            this.removePlayer(player.id);
        }
        this.addLeaveMessage(player.username);
    }
    startGame() {
        const loadData = this._loadData
            ? {
                seed: this._loadData.seed,
                id: this._loadData.gameId,
            }
            : undefined;
        const game = new Game_1.GameClass(this._players);
        const gameController = new GameController_1.GameController(game, this._players);
        this._gameController = gameController;
        this._chatService.clearSystemMessages();
        if (this._loadData) {
            this._gameController.loadBySteps(this._loadData.playerActions);
        }
        return gameController;
    }
    assignColor(userId, color) {
        this.getPlayerByUserId(userId).assignColor(color);
    }
    assignCharacter(userId, character, gender) {
        this.getPlayerById(userId).assignCharacter({ char: character, gender });
    }
    changeCharacter(userId, character) {
        const player = this.getPlayerByUserId(userId);
        player.assignCharacter(Object.assign(Object.assign({}, player.assignedCharacter), character));
    }
    isHost(userId) {
        return this._host.id === userId;
    }
    canStart() {
        const duplicated = (0, getDuplicatedElements_1.getDuplicatedElements)(this._players.map((player) => player.assignedCharacter.char)).length > 0;
        const allReady = this._players.every((player) => player.ready);
        return !duplicated && allReady;
    }
    getGame() {
        var _a;
        return (_a = this._gameController) === null || _a === void 0 ? void 0 : _a.game;
    }
    setPlayerReady(userId, ready) {
        this.getPlayerByUserId(userId).ready = ready;
    }
    kickPlayer(playerId) {
        const player = this.getPlayerById(playerId);
        if ((0, isUser_1.isUser)(player.user) && !this.isGameInProgress && !this.isLoadMode) {
            this.leaveSession(player.user);
        }
    }
    addMessage(userId, message) {
        const player = this.getPlayerByUserId(userId);
        this._chatService.addMsg(player.username, message);
    }
    updateSettings(settings) {
        if (!this.isLoadMode) {
            this._settings = Object.assign(Object.assign({}, this._settings), settings);
        }
    }
    onSessionRemove() {
        clearInterval(this._sendLatencyInterval);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this.getGame();
            if (game) {
                return this._saveService.saveGame(game);
            }
            else {
                throw new Error("No game to save!");
            }
        });
    }
    changeHost() {
        this._host = this.findNextAvailableHost();
    }
    findNextAvailableHost() {
        const current = this.getPlayerByUserId(this._host.id);
        const startIndex = this.players.indexOf(current);
        if (startIndex === -1) {
            throw new Error("Host not found in the players list");
        }
        const totalPlayers = this.players.length;
        for (let i = 1; i < totalPlayers; i++) {
            const index = (startIndex + i) % totalPlayers;
            const candidate = this.players[index];
            if (candidate && (0, isUser_1.isUser)(candidate.user)) {
                return candidate.user;
            }
        }
        throw new Error("Can't find next available host");
    }
    addNewPlayer(user) {
        const player = new Player_1.Player(user, {
            gender: "male",
            char: this.getUnassignedCharacter(),
        }, this.findAvailableColor(), user.username);
        this._players.push(player);
    }
    getUnassignedCharacter() {
        const char = this._characters.find((char) => !this.isCharacterTaken(char));
        if (!char) {
            throw new Error("No more unassigned characters.");
        }
        return char;
    }
    getPlayerByUserId(userId) {
        const player = this._players.find((player) => player.user.id === userId);
        if (!player) {
            throw new Error(`Can't find player that belongs to user with id: ${userId}`);
        }
        return player;
    }
    getPlayerById(playerId) {
        const player = this._players.find((player) => player.id === playerId);
        if (!player) {
            throw new Error(`Can't find player with id: ${playerId}`);
        }
        return player;
    }
    findAvailableColor() {
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
    isColorTaken(color) {
        return this._players.some((player) => player.color === color);
    }
    isCharacterTaken(character) {
        return this._players.some((player) => { var _a; return ((_a = player.assignedCharacter) === null || _a === void 0 ? void 0 : _a.char) === character; });
    }
    sendLatencyListToAllPlayers() {
        const list = this._players.map((player) => ({
            playerId: player.id,
            latency: (0, isUser_1.isUser)(player.user) ? player.user.latency : null,
        }));
        server_1.io.to(this.id).emit(Socket_1.SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT, {
            list,
        });
    }
    addJoinMessage(playerName) {
        this._chatService.addSystemMsg(ChatService_2.SYSTEM_MSG.PLAYER_HAS_JOINED_SESSION, playerName);
    }
    addLeaveMessage(playerName) {
        this._chatService.addSystemMsg(ChatService_2.SYSTEM_MSG.PLAYER_HAS_LEFT_SESSION, playerName);
    }
    loadSessionData(saveGame) {
        try {
            this._players = saveGame.players.map((player) => {
                return new Player_1.Player({ username: player.username, id: player.userId }, player.assignedCharacter, player.color, player.username);
            });
            this._settings = saveGame.sessionSettings;
            this._loadData = saveGame;
            this.chatService.addSystemMsg(ChatService_2.SYSTEM_MSG.ONLY_PRESENT_PLAYERS_CAN_JOIN, "");
        }
        catch (e) {
            console.warn(e);
        }
    }
    isUserInSession(userId) {
        return this._players.some((player) => player.user.id === userId && !player.isPlaceHolder);
    }
    usersPlayerExist(userId) {
        return this._players.some((player) => player.user.id === userId);
    }
    removePlayer(playerId) {
        this._players = this._players.filter((player) => player.id !== playerId);
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map