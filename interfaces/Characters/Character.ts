import {ICharEffects} from "./CharEffects";
import {IPawnService, IPawnServiceRenderData} from "../Pawns/PawnService";
import {ISkill, ISkillRenderData} from "../Skill/Skill";
import {ActionDice} from "../RollDice/RollDice";
import {Cloud} from "../Weather/Weather";

export interface ICharacterRenderData {
    pawnService: IPawnServiceRenderData<ICharacterRenderData>;
    name: CHARACTER;
    namePL: string;
    id: number;
    health: number;
    maxHealth: number;
    gender: Gender;
    determination: number;
    skills: ISkillRenderData[];
}

export interface ICharacter {
    pawnService: IPawnService<ICharacter>;
    name: CHARACTER;
    id: number;
    maxHealth: number;
    effects: ICharEffects;
    skills: ISkill[];
    useSkill: (name: string, target: ICharacter | ActionDice | Cloud | null) => void;
    namePL: string;
    health: number;
    gender: Gender;
    renderData: ICharacterRenderData;
    determination: number;
    incrDetermination: (by: number) => void;
    decrDetermination: (by: number) => void;
    hurt: (by: number) => void;
    heal: (by: number) => void;
}

export enum CHARACTER {
    COOK = "cook",
    DOG = "dog",
    FRIDAY = "friday",
}

export type Gender = "male" | "female";
