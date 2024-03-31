import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {IUser} from "../../../types/UserData/IUser";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {uuid} from "uuidv4";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {Explorer} from "../CharacterService/Characters/Explorer";
import {Cook} from "../CharacterService/Characters/Cook";
import {Carpenter} from "../CharacterService/Characters/Carpenter";
import {Soldier} from "../CharacterService/Characters/Soldier";


export class Player implements IPlayer {


    private readonly _username: string;
    private _color: PAWN_COLOR | null = null;
    private _character: IPlayerCharacter | null = null;
    private readonly _user: IUser;
    private readonly _id = uuid();

    private _assignedCharacter: { char: CHARACTER, gender: Gender } | null = null;


    constructor(user: IUser) {
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

    get assignedCharacter(): { char: CHARACTER; gender: Gender } | null {
        return this._assignedCharacter;
    }

    get character(): IPlayerCharacter | null {
        return this._character;
    }

    get user(): IUser {
        return this._user;
    }

    get id(): any {
        return this._id;
    }

    assignColor(color: PAWN_COLOR) {
        this._color = color;
    }

    assignCharacter(character: { char: CHARACTER, gender: Gender }) {
        this._assignedCharacter = character;
    }

    initCharacter(game: IGame): void {
        switch (this._assignedCharacter?.char) {
            case CHARACTER.COOK:
                this._character = new Cook(this._assignedCharacter.gender, game, this);
                break;
            case CHARACTER.EXPLORER:
                this._character = new Explorer(this._assignedCharacter.gender, game, this);
                break;
            case CHARACTER.CARPENTER:
                this._character = new Carpenter(this._assignedCharacter.gender, game, this);
                break
            case CHARACTER.SOLDIER:
                this._character = new Soldier(this._assignedCharacter.gender, game, this);
        }
    }


    getCharacter(): IPlayerCharacter {
        if (!this._character) {
            throw new Error(
                "There is no Character assigned to player: " + this.username
            );
        }
        return this._character;
    }


}
