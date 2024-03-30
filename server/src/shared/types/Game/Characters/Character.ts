import {ICharEffects} from "./CharEffects";
import {IPawnService, IPawnServiceRenderData} from "../Pawns/PawnService";
import {IAbility, ISkillRenderData} from "../Skill/IAbility";
import {ActionDice} from "../RollDice/RollDice";
import {Cloud} from "../Weather/Weather";
import {ISideCharacterRenderData} from "./SideCharacter";
import {PawnOwner} from "../PawnOwner/PawnOwner";
import {IPlayerCharacterRenderData} from "./PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export interface ICharacterRenderData {
    pawnService: IPawnServiceRenderData<ICharacterRenderData>;
    name: CHARACTER;
    id: number;
    health: number;
    maxHealth: number;
    gender: Gender;
    determination: number;
    skills: ISkillRenderData[];
}

export interface ICharacter extends PawnOwner<IPlayerCharacterRenderData | ISideCharacterRenderData> {
    pawnService: IPawnService<ICharacter>;
    name: CHARACTER;
    id: number;
    maxHealth: number;
    effects: ICharEffects;
    skills: IAbility<any>[];
    useAbility: (name: ABILITY, target: ICharacter | ActionDice | Cloud | null) => void;
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
    EXPLORER = "explorer",
    CARPENTER = "carpenter",
    SOLDIER = "solder",
    DOG = "dog",
    FRIDAY = "friday",
}

export type Gender = "male" | "female";
