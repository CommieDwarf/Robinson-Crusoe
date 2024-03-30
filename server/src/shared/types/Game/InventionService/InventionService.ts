import {IInvention, IInventionRenderData, INVENTION, INVENTION_NORMAL} from "./Invention";
import {ICharacter} from "../Characters/Character";

export interface IInventionServiceRenderData {
    inventions: IInventionRenderData[];
}

export interface IInventionService {
    inventions: IInvention[];
    builtInventions: IInvention[];
    scenario: string;
    build: (invention: INVENTION, builder: ICharacter) => void;
    destroy: (invention: INVENTION) => void;
    updateLocks: () => void;
    getInvention: (invention: INVENTION) => IInvention;

    shuffleInventionStack: () => void;
    fireplace: boolean;
    isBuilt: (invention: INVENTION) => boolean;

    addInvention: (invention: IInvention) => void;

    useInvention: (name: INVENTION) => void;
    pickInventionsFromStack: (amount: number) => IInvention[];
    resetCardPawns: () => void;

    onMapExplore: () => void;


    renderData: IInventionServiceRenderData;
}
