import {PHASE} from "../PhaseService/Phase";
import {AdventureAction} from "../../../Server/src/ACTION";
import {ActionDice} from "../RollDice/RollDice";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {Phase} from "../PhaseService/PhaseService";
import {Cloud} from "../Weather/Weather";
import {ICharacter} from "../Characters/Character";


export type SkillTarget = ICharacter | ActionDice | Cloud | null;

export interface ISkill<Target extends SkillTarget> {
    name: string;
    namePL: string;
    description: string;
    quote: string;
    phasesAllowed: Phase[] | "all";
    actionAllowed: AdventureAction | null;

    usedInThisRound: boolean;

    canBeUsed: () => boolean;
    use: (target: Target) => void;
    cost: number;
    renderData: ISkillRenderData;
}

export interface ISkillRenderData {
    name: string;
    namePL: string;
    description: string;
    quote: string;
    phasesAllowed: Phase[] | "all";
    actionAllowed: AdventureAction | null;
    cost: number;
    canBeUsed: boolean;
    usedInThisRound: boolean;
}
