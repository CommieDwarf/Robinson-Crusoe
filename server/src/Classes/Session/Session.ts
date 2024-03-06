import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {Player} from "../Game/Players/Player";
import {UserData} from "../../types/UserData/UserData";
import {BaseController} from "../../types/GameController/Controllers";
import {GameClass} from "../Game/Game";
import {GameController} from "../GameController/GameController";
import {SessionData} from "../../types/Session/Session";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {uuid} from "uuidv4";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

export class Session implements SessionData {
    private _players: IPlayer[] = [];

    private _gameController: BaseController | null = null;

    private _colors: PAWN_COLOR[] = Object.values(PAWN_COLOR);

    private _id = uuid();


    constructor(creator: UserData) {
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

    public handleAction(user: UserData, action: CONTROLLER_ACTION, ...args: any[]): void {
        const player = this.getPlayer(user);
        this._gameController?.handleAction(action, player, ...args);
    }

    public joinSession(user: UserData) {
        const player = new Player(user);
        player.assignColor(this.findAvailableColor());
        this._players.push(player);
    }


    public leaveSession(user: UserData) {
        this._players = this._players.filter((player) => player.user.id !== user.id);
    }

    public startGame(): BaseController {
        const gameController = new GameController(new GameClass(this._players), this._players);
        this._gameController = gameController;
        return gameController;
    }

    public assignColor(user: UserData, color: PAWN_COLOR): void {
        if (this.isColorTaken(color)) {
            this.getPlayer(user).assignColor(color);
        }
    }


    private getPlayer(user: UserData): IPlayer {
        const searched = this._players.find((player) => player.user.id === user.id);
        if (!searched) {
            throw new Error(`There is no player that belongs to user: ${user}`);
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
}
