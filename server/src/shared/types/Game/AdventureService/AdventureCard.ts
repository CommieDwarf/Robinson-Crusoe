import {ACTION} from "../ACTION";
import {ADVENTURE_CARD} from "./ADVENTURE_CARD";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";

export type AdventureOptionLabel = "" | "discard" | "shuffle" | "keep";

export interface IAdventureEventOption {
    label: string,
    resolve: () => void;
}

export interface IAdventureEventOptionRenderData {
    label: string,
}

export interface IAdventureCard {
    name: ADVENTURE_CARD;
    eventName: string;
    action: ACTION;
    shouldDecide: boolean;

    option2Label: string;

    resolveOption1: (resolver: IPlayerCharacter) => void;
    resolveOption2: (resolver: IPlayerCharacter) => void;

    eventOption1: IAdventureEventOption | null;
    eventOption2: IAdventureEventOption | null;
    triggerEventEffect: () => void;
    renderData: IAdventureCardRenderData;
}

export interface IAdventureCardRenderData {
    name: string;
    shouldDecide: boolean;
    action: ACTION.EXPLORE | ACTION.GATHER | ACTION.BUILD;
    option1Label: AdventureOptionLabel;
    option2Label: AdventureOptionLabel;
    eventOption1: IAdventureEventOptionRenderData | null;
    eventOption2: IAdventureEventOptionRenderData | null;
}
