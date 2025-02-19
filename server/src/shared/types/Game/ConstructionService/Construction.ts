import {
	IResourceCommittableItem,
	IResourceCommittableItemRenderData,
} from "../ResourceCommitableItem/ResourceCommittableItem";

export type ConstructionCostType = "wood" | "leather";

export interface IConstructionRenderData
	extends IResourceCommittableItemRenderData<ConstructionCostType> {
	name: CONSTRUCTION;
	lvl: number;
	locked: boolean;
	canResourceBeSwitched: boolean;
	temporaryBoost: number;
}

export interface IConstruction
	extends IResourceCommittableItem<ConstructionCostType> {
	name: CONSTRUCTION;
	namePL: string;
	lvl: number;
	locked: boolean;
	renderData: IConstructionRenderData;
	resourceChoice: boolean;

	temporaryBoost: number;

	boostedLvl: number;

	incrTemporaryBoost: (value: number) => void;
	resetTemporaryBoost: () => void;
}

export enum CONSTRUCTION {
	SHELTER = "shelter",
	ROOF = "roof",
	PALISADE = "palisade",
	WEAPON = "weapon",
}
