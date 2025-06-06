import { IBasicResourcesAmount } from "../Resources/Resources";
import { CONSTRUCTION } from "../ConstructionService/Construction";
import { INVENTION_STARTER } from "../InventionService/Invention";
import { AdventureAction } from "../ACTION";
import {
	IResourceCommittableItem,
	IResourceCommittableItemRenderData,
} from "../ResourceCommitableItem/ResourceCommittableItem";

export interface IEventCard
	extends IResourceCommittableItem<keyof IBasicResourcesAmount> {
	name: string;
	namePL: string;
	resolutionPL: string;
	renderData: IEventCardRenderData;
	cardType: AdventureAction | EVENT_TYPE;
	requirements: EventResolveRequirements;

	triggerEventEffect(): void;

	fullFill(): void;

	triggerThreatEffect(): void;

	meetsRequirement: () => void;

	setAdventureToken: () => void;
}

export interface IEventCardRenderData
	extends IResourceCommittableItemRenderData<keyof IBasicResourcesAmount> {
	name: string;
	cardType: AdventureAction | EVENT_TYPE;
	meetsRequirement: boolean;
}

export enum EVENT_TYPE {
	BOOK = "book",
	WRECKAGE = "wreckage",
}

export interface EventResolveRequirements {
	pawns: number;
	invention: INVENTION_STARTER | null;
	construction: {
		type: CONSTRUCTION;
		lvl: number;
	} | null;
	resource: keyof IBasicResourcesAmount | null;
	optionalResource: keyof IBasicResourcesAmount | null;
}
