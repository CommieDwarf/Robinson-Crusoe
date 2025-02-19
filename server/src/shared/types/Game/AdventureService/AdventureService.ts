import { AdventureAction } from "../ACTION";
import { IAdventureCard } from "./AdventureCard";
import { IResolvableItem } from "../ActionService/IResolvableItem";
import { IPlayer } from "@shared/types/Game/PlayerService/Player";
import { CurrentResolveRenderData } from "../EventService/EventService";
import { CHARACTER } from "../Characters/Character";

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
	resolveAdventureCard: (option: 1 | 2, resolver: CHARACTER) => void;
	setCurrentAdventure: (resolvableItem: IResolvableItem) => void;
	renderData: IAdventureServiceRenderData;
}

export interface IAdventureServiceRenderData {
	currentAdventure: CurrentResolveRenderData<IAdventureCard> | null;
}
