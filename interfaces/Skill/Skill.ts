import {PHASE} from "../PhaseService/Phase";
import {AdventureAction} from "../ACTION";
import {ActionDice} from "../RollDice/RollDice";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {Phase} from "../PhaseService/PhaseService";
import {Cloud} from "../Weather/Weather";

export interface ISkill {
    name: string;
    namePL: string;
    description: string;
    quote: string;
    phasesAllowed: Phase[] | "all";
    actionAllowed: AdventureAction | null;

    canBeUsed: () => boolean;
    use: (target: IPlayerCharacter | ActionDice | Cloud | null) => void;
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
