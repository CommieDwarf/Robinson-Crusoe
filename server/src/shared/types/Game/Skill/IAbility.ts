import {AdventureAction} from "../ACTION";
import {ActionDice} from "../RollDice/RollDice";
import {Phase} from "../PhaseService/PhaseService";
import {Cloud} from "../Weather/Weather";
import {ICharacter} from "../Characters/Character";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";


export type SkillTarget = ICharacter | ActionDice | Cloud | null;


export interface IAbility<Target extends SkillTarget> {
    name: ABILITY;
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
