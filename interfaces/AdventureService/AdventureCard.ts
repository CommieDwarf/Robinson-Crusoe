import {ACTION} from "../ACTION";
import {ADVENTURE_CARD} from "./ADVENTURE_CARD";
import {ICharacter} from "../Characters/Character";

export type AdventureOptionLabel = "" | "discard" | "shuffle" | "keep";

export interface IAdventureCard {
    name: ADVENTURE_CARD;
    namePL: string;
    eventNamePL: string;
    action: ACTION;
    shouldDecide: boolean;
    option1Label: string;
    option2Label: string;

    option1: (resolver: ICharacter) => void;
    option2: (resolver: ICharacter) => void;
    triggerEventEffect: () => void;

    renderData: IAdventureCardRenderData;
}

export interface IAdventureCardRenderData {
    name: string;
    shouldDecide: boolean;
    action: ACTION.EXPLORE | ACTION.GATHER | ACTION.BUILD;
    option1Label: AdventureOptionLabel;
    option2Label: AdventureOptionLabel;
}
