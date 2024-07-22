import {AdventureAction} from "../ACTION";
import {IAdventureCard, IAdventureCardRenderData} from "./AdventureCard";
import {IResolvableItem} from "../ActionService/IResolvableItem";
import {IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {ICharacter, ICharacterRenderData} from "@shared/types/Game/Characters/Character";

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
    player: IPlayer;
}

export interface IAdventureService {
    currentAdventure: CurrentAdventure | null;
    resolveAdventureCard: (option: 1 | 2, resolverName: string) => void;
    setCurrentAdventure: (resolvableItem: IResolvableItem) => void;
    renderData: IAdventureServiceRenderData;
}

export interface IAdventureServiceRenderData {
    currentAdventure: { card: IAdventureCardRenderData, player: IPlayerRenderData } | null;
}
