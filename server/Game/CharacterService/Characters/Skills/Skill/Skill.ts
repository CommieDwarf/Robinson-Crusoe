import {PHASE} from "../../../../../../interfaces/PhaseService/Phase";
import {AdventureAction} from "../../../../../../interfaces/ACTION";
import {IGame} from "../../../../../../interfaces/Game";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {Phase} from "../../../../../../interfaces/PhaseService/PhaseService";
import {phaseOrder} from "../../../../../../constants/phaseOrder";
import {Cloud} from "../../../../../../interfaces/Weather/Weather";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export abstract class Skill implements ISkill {
    protected readonly _name: string;
    protected readonly _namePL: string;
    protected readonly _description: string;
    protected readonly _quote: string;

    protected readonly _phasesAllowed: Phase[];
    protected readonly _actionAllowed: AdventureAction | null;
    protected readonly _game: IGame;

    protected _lastRoundUsed = 0;
    protected _cost: number;

    abstract use(target: ICharacter | ActionDice | Cloud | null): void;


    protected constructor(
        name: string,
        namePL: string,
        description: string,
        quote: string,
        phasesAllowed: Phase[] | "all",
        actionAllowed: AdventureAction | null,
        cost: number,
        game: IGame
    ) {
        this._name = name;
        this._namePL = namePL;
        this._description = description;
        this._quote = quote;
        if (phasesAllowed === "all") {
            this._phasesAllowed = [...phaseOrder];
        } else {
            this._phasesAllowed = phasesAllowed;
        }
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
            usedInThisRound: this.usedInThisRound,
            cost: this._cost,
            canBeUsed: this.canBeUsed(),
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

    get phasesAllowed(): Phase[] {
        return this._phasesAllowed;
    }

    get actionAllowed(): AdventureAction | null {
        return this._actionAllowed;
    }

    get usedInThisRound() {
        return this._lastRoundUsed === this._game.round;
    }

    public canBeUsed() {
        return (
            (this._phasesAllowed.includes(this._game.phaseService.phase))
            && (this._actionAllowed ? this._actionAllowed === this._game.actionService.action : true)
            && !this.usedInThisRound
        )
    }


    protected updateLastRoundUsed() {
        this._lastRoundUsed = this._game.round;
    }

    protected addLogMsg(charNamePL: string) {
        this._game.chatLog.addMessage(`${charNamePL} użył ${this._namePL}`, "green", "Umiejętność");
    }
}
