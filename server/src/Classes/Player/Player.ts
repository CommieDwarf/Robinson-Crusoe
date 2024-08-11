import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {AssignedCharacter, IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {uuid} from "uuidv4";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {IUser} from "../../types/UserData/IUser";
import {Soldier} from "../Game/CharacterService/Characters/Soldier";
import {Cook} from "../Game/CharacterService/Characters/Cook";
import {Explorer} from "../Game/CharacterService/Characters/Explorer";
import {Carpenter} from "../Game/CharacterService/Characters/Carpenter";
import {clearInterval} from "timers";
import {pingClient} from "../../utils/pingClient";

export interface PingHandles {
    pingInterval: NodeJS.Timeout | null,
    timeoutHandle: NodeJS.Timeout | null,
}

export class Player implements IPlayer {


    private readonly _username: string;
    private _color: PLAYER_COLOR;
    private _character: IPlayerCharacter | null = null;
    private readonly _user: IUser;
    private readonly _id = uuid();
    private _ready = false;
    private _assignedCharacter: AssignedCharacter;
    private _prime = false;


    constructor(user: IUser,
                assignedCharacter: AssignedCharacter, color: PLAYER_COLOR) {
        this._user = user;
        this._username = user.username;
        this._assignedCharacter = assignedCharacter;
        this._color = color;
    }

    get renderData(): IPlayerRenderData {
        return {
            username: this._username,
            color: this._color || "black",
            id: this.id,
            character: this._character?.renderData || null,
            assignedCharacter: this._assignedCharacter,
            ready: this._ready,
            prime: this._prime,
        };
    }

    get username(): string {
        return this._username;
    }

    get color(): PLAYER_COLOR {
        return this._color;
    }

    get assignedCharacter(): AssignedCharacter {
        return this._assignedCharacter;
    }

    get character(): IPlayerCharacter | null {
        return this._character;
    }

    get user(): IUser {
        return this._user;
    }

    get id(): string {
        return this._id;
    }

    get ready(): boolean {
        return this._ready;
    }

    set ready(value: boolean) {
        this._ready = value;
    }

    get prime(): boolean {
        return this._prime;
    }

    set prime(value: boolean) {
        this._prime = value;
    }

    assignColor(color: PLAYER_COLOR) {
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
            throw new Error("Character not initialized");
        }
        return this._character;
    }


}
