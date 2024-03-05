import {IPlayer} from "../PlayerService/Player";
import {CHARACTER, ICharacter, ICharacterRenderData} from "./Character";
import {ISkill, ISkillRenderData} from "../Skill/Skill";
import {AdventureAction} from "../ACTION";
import {PawnOwner} from "../PawnOwner/PawnOwner";

export type PlayerCharacterName = Exclude<CHARACTER, "dog" | "friday">;

export interface Wounds {
    head: AdventureAction[];
    stomach: AdventureAction[];
    arm: AdventureAction[];
    leg: AdventureAction[];
}

export interface IPlayerCharacter extends ICharacter, PawnOwner<IPlayerCharacterRenderData> {
    player: IPlayer;
    name: PlayerCharacterName;
    moraleThresholds: number[];
    moraleThresholdsRemoved: number[];
    renderData: IPlayerCharacterRenderData;
    shouldMoraleDrop: boolean;
    skills: ISkill[];

    wounds: Wounds;

    setWound: (part: keyof Wounds, action: AdventureAction, source: string) => void;
    unsetWound: (part: keyof Wounds, action: AdventureAction, source: string) => void;
    
}

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
    playerId: number;
    name: PlayerCharacterName;
    moraleThresholds: number[];
    moraleThresholdsRemoved: number[];
    skills: ISkillRenderData[];
    wounds: Wounds;
}
