import {
	CONSTRUCTION,
	IConstruction,
	IConstructionRenderData,
} from "./Construction";

export interface IConstructionServiceRenderData {
	constructions: IConstructionRenderData[];
}

export interface IConstructionService {
	constructions: IConstruction[];
	lvlUpConstruction: (
		construction: CONSTRUCTION,
		amount: number,
		logSource: string
	) => void;
	lvlDownConstruction: (
		construction: CONSTRUCTION,
		amount: number,
		logSource: string
	) => void;
	lvlDownOrGetHurt: (
		construction: CONSTRUCTION,
		amount: number,
		logSource: string
	) => void;
	lvlDownIfPossible: (
		construction: CONSTRUCTION,
		amount: number,
		logSource: string
	) => void;
	setDividedLvlByTwoRoundedDown: (
		construction: CONSTRUCTION,
		sourceLog: string
	) => void;
	setDividedLvlByTwoRoundedUp: (
		construction: CONSTRUCTION,
		sourceLog: string
	) => void;
	setLvl: (construction: CONSTRUCTION, lvl: number) => void;
	unlockConstruction: (construction: CONSTRUCTION) => void;
	lockConstruction: (construction: CONSTRUCTION) => void;
	unlockAllConstructions: () => void;

	getConstruction: (construction: CONSTRUCTION) => IConstruction;
	isBuilt: (construction: CONSTRUCTION) => boolean;

	switchCommittedResources: (construction: CONSTRUCTION) => void;
	updateLocks: () => void;
	renderData: IConstructionServiceRenderData;
}
