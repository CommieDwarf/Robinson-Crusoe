import {
    DISCOVERY_TOKEN,
    IToken,
    ITokenRenderData,
} from "../../../../../interfaces/TokenService/Token";
import {IGame} from "../../../../../interfaces/Game";
import {v4 as uuidv4} from "uuid";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export abstract class Token implements IToken {

    protected _name: DISCOVERY_TOKEN;
    protected _description: string;
    protected _game: IGame;
    protected _used: boolean = false;
    protected readonly _sourceLog: string;
    protected _id = uuidv4();
    private readonly _namePL: string;

    protected constructor(
        game: IGame,
        name: DISCOVERY_TOKEN,
        namePL: string,
        description: string
    ) {
        this._game = game;
        this._name = name;
        this._namePL = namePL;
        this._description = description;
        this._sourceLog = "Żeton: " + this.namePL;
    }

    get renderData(): ITokenRenderData {
        return {
            name: this._name,
            namePL: this._namePL,
            description: this._description,
            id: this._id,
        };
    }

    get namePL(): string {
        return this._namePL;
    }

    get used(): boolean {
        return this._used;
    }

    get id(): string {
        return this._id;
    }

    get name(): DISCOVERY_TOKEN {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    public use(user: IPlayerCharacter, target: IPlayerCharacter | null = null): void {
        this._game.chatLog.addMessage(
            `postać ${user.namePL} użyła ${capitalizeFirstLetter(this.namePL)}`,
            "neutral",
            "Żeton odkryć"
        );
    }

    public autoDiscard(): void {
        this._game.chatLog.addMessage(
            `żeton ${this.name} został użyty`,
            "neutral",
            "Auto-użycie"
        );
    }
}
