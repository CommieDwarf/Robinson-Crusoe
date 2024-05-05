import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {BaseController} from "../../types/GameController/Controllers";
import {GameClass} from "../Game/Game";
import {GameController} from "../GameController/GameController";
import {SessionBasicInfo, SessionData} from "../../shared/types/Session/Session";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {uuid} from "uuidv4";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {SessionSettings} from "@shared/types/SessionSettings";
import {IUser} from "../../types/UserData/IUser";
import {Player} from "../Player/Player";


export class Session implements SessionData {


    private _players: IPlayer[] = [];
    private _gameController: BaseController | null = null;
    private _colors: PAWN_COLOR[] = Object.values(PAWN_COLOR);

    private _id = uuid();
    private _connectCode = uuid();
    private _characters: CHARACTER[] = Object.values(CHARACTER);
    private readonly _settings: SessionSettings;
    private _host: IPlayer;
    private _singleplayer: boolean;

    constructor(host: IUser, settings: SessionSettings, singleplayer = false) {
        this._settings = settings;
        const player = new Player(host, {char: this.getUnassignedCharacter(), gender: "male"});
        this.joinSession(player);
        this._host = player;
        this._singleplayer = singleplayer;
    }

    get renderData() {
        return {
            id: this._id,
            connectCode: this._connectCode,
            settings: this._settings,
            players: this._players.map((player) => player.renderData),
            host: this._host.renderData,
            game: this.gameController?.game.renderData || null,
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

    get host(): IPlayer {
        return this._host;
    }


    public getBasicInfo(): SessionBasicInfo {
        return {
            name: this._settings.name,
            host: this._host.user.username,
            players: this._players.length,
            maxPlayers: this._settings.maxPlayers,
            scenario: this._settings.scenario,
            password: !!this._settings.password,
            id: this._id
        }
    }

    public handleAction(userId: string, action: CONTROLLER_ACTION, ...args: any[]): void {
        const player = this.getPlayerByUserId(userId);
        this._gameController?.handleAction(action, player, ...args);
    }

    public joinSession(player: IPlayer) {
        this._players.push(player);
        this.assignColor(player.id, this.findAvailableColor());
        this.assignCharacter(player.id, CHARACTER.SOLDIER, "male");
    }


    public leaveSession(player: IPlayer) {
        this._players = this._players.filter((pl) => pl.id !== player.id);
    }

    public startGame(): BaseController {
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
        if (!this.isCharacterTaken(character)) {
            this.getPlayerById(userId).assignCharacter({char: character, gender});
        } else {
            throw new Error(`Character ${character} is taken!`);
        }
    }

    private getUnassignedCharacter(): CHARACTER {
        const char = this._characters.find((char) => !this.isCharacterTaken(char));
        if (!char) {
            throw new Error("No more unassigned characters.")
        }
        return char
    }

    public getGame() {
        return this._gameController?.game;
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
}
