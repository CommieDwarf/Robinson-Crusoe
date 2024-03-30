import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {Player} from "../Game/Players/Player";
import {IUser} from "../../types/UserData/IUser";
import {BaseController} from "../../types/GameController/Controllers";
import {GameClass} from "../Game/Game";
import {GameController} from "../GameController/GameController";
import {GAME_SESSION_MODE, SessionData} from "../../types/Session/Session";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {uuid} from "uuidv4";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {CHARACTER} from "@shared/types/Game/Characters/Character";


export class Session implements SessionData {

    private _players: IPlayer[] = [];

    private _gameController: BaseController | null = null;

    private _colors: PAWN_COLOR[] = Object.values(PAWN_COLOR);

    private _id = uuid();

    private _characters: CHARACTER[] = Object.values(CHARACTER);

    private readonly _mode: GAME_SESSION_MODE;


    constructor(creator: IUser, mode: GAME_SESSION_MODE) {
        this._mode = mode;
        this.joinSession(creator);
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

    get mode(): GAME_SESSION_MODE {
        return this._mode;
    }

    public handleAction(userId: string, action: CONTROLLER_ACTION, ...args: any[]): void {
        const player = this.getPlayer(userId);
        this._gameController?.handleAction(action, player, ...args);
    }

    public joinSession(user: IUser) {
        const player = new Player(user);
        this._players.push(player);
        this.assignColor(user._id, this.findAvailableColor());
        this.assignCharacter(user._id, CHARACTER.CARPENTER);
    }


    public leaveSession(user: IUser) {
        this._players = this._players.filter((player) => player.user._id !== user._id);
    }

    public startGame(): BaseController {
        const game = new GameClass(this._players);
        const gameController = new GameController(game, this._players);
        this._gameController = gameController
        return gameController;
    }

    public assignColor(userId: string, color: PAWN_COLOR): void {
        if (!this.isColorTaken(color)) {
            this.getPlayer(userId).assignColor(color);
        }
    }

    public assignCharacter(userId: string, character: CHARACTER) {
        if (!this.isCharacterTaken(character)) {
            this.getPlayer(userId).assignCharacter({char: character, gender: "male"});
        } else {
            throw new Error(`Character ${character} is taken!`);
        }
    }

    public getGame() {
        return this._gameController?.game;
    }


    private getPlayer(userId: string): IPlayer {
        const searched = this._players.find((player) => player.user._id === userId);
        if (!searched) {
            throw new Error(`There is no player that belongs to user: ${userId}`);
        }
        return searched;
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
