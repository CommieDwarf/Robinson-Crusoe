import {ACTION} from "../ACTION";
import {ADVENTURE_CARD} from "./ADVENTURE_CARD";
import {IPlayerCharacter} from "../Characters/Character";

export type AdventureOptionLabel = "" | "discard" | "shuffle" | "keep";

export interface IAdventureEventOption {
    label: string,
    resolve: () => void;
    canBeResolved: () => boolean;
}

export interface IAdventureEventOptionRenderData {
    label: string,
    canBeResolved: boolean;
}

export interface IAdventureCard {
    name: ADVENTURE_CARD;
    namePL: string;
    eventNamePL: string;
    action: ACTION;
    shouldDecide: boolean;
    option1Label: string;
    option2Label: string;
    eventOptions: IAdventureEventOption[] | null;

    option1: (resolver: IPlayerCharacter) => void;
    option2: (resolver: IPlayerCharacter) => void;
    triggerEventEffect: () => void;

    renderData: IAdventureCardRenderData;
}

export interface IAdventureCardRenderData {
    name: string;
    shouldDecide: boolean;
    action: ACTION.EXPLORE | ACTION.GATHER | ACTION.BUILD;
    option1Label: AdventureOptionLabel;
    option2Label: AdventureOptionLabel;
    eventOptions: IAdventureEventOptionRenderData[] | null;
}
