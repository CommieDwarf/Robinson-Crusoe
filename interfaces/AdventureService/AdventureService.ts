import {AdventureAction} from "../ACTION";
import {IAdventureCard, IAdventureCardRenderData} from "./AdventureCard";
import {IResolvableItem} from "../ActionService/IResolvableItem";

export type AdventureCardStacks = {
    [key in AdventureAction]: IAdventureCard[];
};

export interface AdventureRelatedActionInfo {
    tileId: number;
    source: "left" | "right" | null;
}

export interface CurrentAdventure {
    card: IAdventureCard;
    relatedActionInfo: AdventureRelatedActionInfo | null;
}

export interface IAdventureService {
    currentAdventure: CurrentAdventure | null;
    resolveAdventureCard: (option: 1 | 2, resolverName: string) => void;
    setCurrentAdventure: (resolvableItem: IResolvableItem) => void;

    renderData: IAdventureServiceRenderData;
}

export interface IAdventureServiceRenderData {
    currentCard: IAdventureCardRenderData | null;
}
