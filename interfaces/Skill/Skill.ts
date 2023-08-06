import {PHASE} from "../PhaseService/Phase";
import {AdventureAction} from "../ACTION";
import {IPlayerCharacter} from "../Characters/Character";
import {ActionDice} from "../RollDice/RollDice";

export interface ISkill {
    name: string;
    namePL: string;
    description: string;
    quote: string;
    phasesAllowed: PHASE[];
    actionAllowed: AdventureAction | null;
    use: (target: IPlayerCharacter | ActionDice | null) => void;
    used: boolean;
    cost: number;
    renderData: ISkillRenderData;
}

export interface ISkillRenderData {
    name: string;
    namePL: string;
    description: string;
    quote: string;
    phasesAllowed: PHASE[];
    actionAllowed: AdventureAction | null;
    cost: number;
    used: boolean;
}
