import {DISCOVERY_TOKEN, IToken, ITokenRenderData,} from "@shared/types/Game/TokenService/Token";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TERMS} from "@shared/types/Terms/TERMS";

export abstract class Token implements IToken {

    protected _name: DISCOVERY_TOKEN;
    protected _description: string;
    protected _game: IGame;
    protected _used: boolean = false;
    protected readonly _sourceLog: string;
    private readonly _namePL: string;
    protected readonly _id: string;

    protected constructor(
        game: IGame,
        name: DISCOVERY_TOKEN,
        namePL: string,
        description: string,
        id: string,
    ) {
        this._game = game;
        this._name = name;
        this._namePL = namePL;
        this._description = description;
        this._sourceLog = this.name;
        this._id = id;
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

    public use(character: ICharacter, target?: ICharacter): void {
        this._game.logService.addMessage({
            code: LOG_CODE.CHARACTER_USED_TOKEN,
            amount: 1,
            subject1: character.name,
            subject2: this._name
        }, "neutral", TERMS.DISCOVERY_TOKEN)
    }

    public autoDiscard(): void {

    }
}
