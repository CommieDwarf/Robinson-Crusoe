import {PHASE} from "../../../../../../interfaces/PhaseService/Phase";
import {AdventureAction} from "../../../../../../interfaces/ACTION";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";

export abstract class Skill implements ISkill {
    protected readonly _name: string;
    protected readonly _namePL: string;
    protected readonly _description: string;
    protected readonly _quote: string;

    protected readonly _phasesAllowed: PHASE[];
    protected readonly _actionAllowed: AdventureAction | null;
    protected readonly _game: IGame;
    protected _used = false;
    protected _cost: number;

    abstract use(target: IPlayerCharacter | ActionDice | null): void;

    protected constructor(
        name: string,
        namePL: string,
        description: string,
        quote: string,
        phasesAllowed: PHASE[],
        actionAllowed: AdventureAction | null,
        cost: number,
        game: IGame
    ) {
        this._name = name;
        this._namePL = namePL;
        this._description = description;
        this._quote = quote;
        this._phasesAllowed = phasesAllowed;
        this._actionAllowed = actionAllowed;
        this._cost = cost;
        this._game = game;
    }

    get renderData() {
        return {
            name: this._name,
            namePL: this._namePL,
            description: this._description,
            quote: this._quote,
            phasesAllowed: this._phasesAllowed,
            actionAllowed: this._actionAllowed,
            used: this._used,
            cost: this._cost,
        };
    }

    get name(): string {
        return this._name;
    }

    get namePL(): string {
        return this._namePL;
    }

    get description(): string {
        return this._description;
    }

    get cost(): number {
        return this._cost;
    }

    get quote(): string {
        return this._quote;
    }

    get phasesAllowed(): PHASE[] {
        return this._phasesAllowed;
    }

    get actionAllowed(): AdventureAction | null {
        return this._actionAllowed;
    }

    get used(): boolean {
        return this._used;
    }

    set used(value: boolean) {
        this._used = value;
    }
}
