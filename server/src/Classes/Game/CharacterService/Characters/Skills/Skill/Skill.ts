import {AdventureAction} from "@shared/types/Game/ACTION";
import {IGame} from "@shared/types/Game/Game";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {Phase} from "@shared/types/Game/PhaseService/PhaseService";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {phaseOrder} from "@shared/constants/phaseOrder";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export abstract class Skill implements ISkill<ICharacter> {
    protected readonly _name: string;
    protected readonly _namePL: string;
    protected readonly _description: string;
    protected readonly _quote: string;

    protected readonly _phasesAllowed: Phase[];
    protected readonly _actionAllowed: AdventureAction | null;
    protected readonly _game: IGame;

    protected _lastRoundUsed = 0;
    protected _cost: number;
    protected _character: ICharacter;


    protected constructor(
        name: string,
        namePL: string,
        description: string,
        quote: string,
        phasesAllowed: Phase[] | "all",
        actionAllowed: AdventureAction | null,
        cost: number,
        game: IGame,
        character: ICharacter,
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
        this._character = character;
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

    public use(target: ICharacter | ActionDice | Cloud | null) {
        this.updateLastRoundUsed();
        this._character.decrDetermination(this.cost);
        this.addLogMsg(this._character.namePL);
    }


    protected updateLastRoundUsed() {
        this._lastRoundUsed = this._game.round;
    }

    protected addLogMsg(charName: string) {
        this._game.logService.addMessage({
            code: LOG_CODE.CHARACTER_USED_ABILITY,
            amount: 1,
            subject1: charName,
            subject2: this._name
        }, "neutral", "")
    }
}
