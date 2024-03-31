import {ACTION, AdventureAction} from "@shared/types/Game/ACTION";
import {IGame} from "@shared/types/Game/Game";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {Phase} from "@shared/types/Game/PhaseService/PhaseService";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {phaseOrder} from "@shared/constants/phaseOrder";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";

export abstract class Ability implements IAbility<any> {
    protected readonly _name: ABILITY;

    protected readonly _phasesAllowed: Phase[];
    protected readonly _actionAllowed: ACTION | null;
    protected readonly _game: IGame;

    protected _lastRoundUsed = 0;
    protected _cost: number;
    protected _character: ICharacter;


    protected constructor(
        name: ABILITY,
        phasesAllowed: Phase[] | "all",
        actionAllowed: ACTION | null,
        cost: number,
        game: IGame,
        character: ICharacter,
    ) {
        this._name = name;
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
            phasesAllowed: this._phasesAllowed,
            actionAllowed: this._actionAllowed,
            usedInThisRound: this.usedInThisRound,
            cost: this._cost,
            canBeUsed: this.canBeUsed(),
        };
    }

    get name(): ABILITY {
        return this._name;
    }

    get cost(): number {
        return this._cost;
    }

    get phasesAllowed(): Phase[] {
        return this._phasesAllowed;
    }

    get actionAllowed(): ACTION | null {
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

    public use(target: any) {
        this.updateLastRoundUsed();
        this._character.decrDetermination(this.cost);
        this.addLogMsg(this._character.name);
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
        }, "neutral", "ability")
    }
}
