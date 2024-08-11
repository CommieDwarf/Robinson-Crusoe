import {IPlayer} from "../PlayerService/Player";
import {CHARACTER, ICharacter, ICharacterRenderData} from "./Character";
import {IAbility, IAbilityRenderData} from "../Skill/IAbility";
import {AdventureAction} from "../ACTION";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";

export type PlayerCharacterName = Exclude<CHARACTER, "dog" | "friday">;

export interface Wounds {
    head: AdventureAction[];
    stomach: AdventureAction[];
    arm: AdventureAction[];
    leg: AdventureAction[];
}

export interface IPlayerCharacter extends ICharacter {
    player: IPlayer;
    name: PlayerCharacterName;
    moraleThresholds: number[];
    moraleThresholdsRemoved: number[];
    renderData: IPlayerCharacterRenderData;
    shouldMoraleDrop: boolean;
    abilities: IAbility<any>[];

    weaponBoost: number;

    hasPersonalResource: {
        [key in keyof IBasicResourcesAmount]: boolean
    }

    wounds: Wounds;

    setWound: (part: keyof Wounds, action: AdventureAction, source: string) => void;
    unsetWound: (part: keyof Wounds, action: AdventureAction, source: string) => void;


    setPersonalResource: (resource: keyof IBasicResourcesAmount, value: boolean) => void;

}

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
    playerId: string;
    name: PlayerCharacterName;
    moraleThresholds: number[];
    moraleThresholdsRemoved: number[];
    hasPersonalResource: {
        wood: boolean,
        leather: boolean,
    }
    abilities: IAbilityRenderData[];
    wounds: Wounds;
    weaponBoost: number;
}
