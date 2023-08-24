import {
    IConstruction,
    IConstructionRenderData,
    CONSTRUCTION,
} from "./Construction";
import {IBasicResources} from "../Resources/Resources";

export interface IConstructionServiceRenderData {
    constructions: IConstructionRenderData[];
}

export interface IConstructionService {
    constructions: IConstruction[];
    lvlUpConstruction: (
        construction: CONSTRUCTION,
        by: number,
        logSource: string
    ) => void;
    lvlDownConstruction: (
        construction: CONSTRUCTION,
        by: number,
        logSource: string
    ) => void;
    lvlDownOrGetHurt: (
        construction: CONSTRUCTION,
        by: number,
        logSource: string
    ) => void;
    lvlDownIfPossible: (
        construction: CONSTRUCTION,
        by: number,
        logSource: string
    ) => void;
    setDividedLvlByTwo: (construction: CONSTRUCTION, sourceLog: string) => void;
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
