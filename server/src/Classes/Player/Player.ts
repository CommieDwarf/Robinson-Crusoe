import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {AssignedCharacter, IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {IUser} from "../../types/UserData/IUser";
import {Soldier} from "../Game/CharacterService/Characters/Soldier";
import {Cook} from "../Game/CharacterService/Characters/Cook";
import {Explorer} from "../Game/CharacterService/Characters/Explorer";
import {Carpenter} from "../Game/CharacterService/Characters/Carpenter";
import {isUser} from "../../utils/TypeGuards/isUser";

export interface PingHandles {
    pingInterval: NodeJS.Timeout | null,
    timeoutHandle: NodeJS.Timeout | null,
}

enum PLAYER_STATUS {
    ONLINE = "online",
    OFFLINE = "offline",
}


export interface UserPlaceHolder {
    username: string,
    id: string,
}

export class Player implements IPlayer {
    private _color: PLAYER_COLOR;
    private _character: IPlayerCharacter | null = null;
    private _user: IUser | UserPlaceHolder;
    private _ready = false;
    private _assignedCharacter: AssignedCharacter;
    private _prime = false;
    private _status = PLAYER_STATUS;
    private readonly _id: string;


    constructor(user: IUser | UserPlaceHolder, assignedCharacter: AssignedCharacter, color: PLAYER_COLOR, id: string) {
        this._user = user;
        this._assignedCharacter = assignedCharacter;
        this._color = color;
        this._id = id;
    }

    get renderData(): IPlayerRenderData {
        return {
            username: this._user.username,
            color: this._color || "black",
            id: this.id,
            character: this._character?.renderData || null,
            assignedCharacter: this._assignedCharacter,
            ready: this._ready,
            prime: this._prime,
            isPlaceHolder: this.isPlaceHolder
        };
    }

    get saveData() {
        return {
            userId: this._user.id,
            username: this._user.username,
            color: this._color,
            assignedCharacter: this._assignedCharacter,
        }
    }

    get username(): string {
        return this._user.username;
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

    get user(): IUser | UserPlaceHolder {
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

    get isPlaceHolder() {
        return !isUser(this._user);
    }


    public setUser(user: IUser) {
        this._user = user;
    }

    public unsetUser() {
        if (isUser(this._user)) {
            this._user = this._user.getPlaceHolder();
        }
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
