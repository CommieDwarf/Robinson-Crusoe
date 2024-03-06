import {IPlayerCharacter} from "@shared/types/Game/Game/Characters/PlayerCharacter";
import {IPlayer, IPlayerRenderData} from "@shared/types/Game/Game/PlayerService/Player";
import {uuid} from "uuidv4";
import {UserData} from "@shared/types/Game/UserData/UserData";
import {PAWN_COLOR} from "@shared/types/Game/Game/PAWN_COLOR";

export class Player implements IPlayer {

    private readonly _username: string;
    private _color: PAWN_COLOR | null = null;
    private _character: IPlayerCharacter | null = null;
    private readonly _user: UserData;
    private readonly _id = uuid();

    constructor(user: UserData) {
        this._user = user;
        this._username = user.username;
    }

    get renderData(): IPlayerRenderData {
        return {
            username: this._username,
            color: this._color || "black",
            id: this.id,
            character: this.getCharacter().renderData,
        };
    }

    get username(): string {
        return this._username;
    }

    get color(): string | null {
        return this._color;
    }

    get character(): IPlayerCharacter | null {
        return this._character;
    }

    get user(): UserData {
        return this._user;
    }

    get id(): any {
        return this._id;
    }

    assignColor(color: PAWN_COLOR) {
        this._color = color;
    }


    getCharacter(): IPlayerCharacter {
        if (!this._character) {
            throw new Error(
                "There is no Character assigned to player: " + this.username
            );
        }
        return this._character;
    }

    setCharacter(value: IPlayerCharacter) {
        this._character = value;
    }
}
