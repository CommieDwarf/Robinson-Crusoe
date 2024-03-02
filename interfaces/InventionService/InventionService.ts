import {IInvention, IInventionRenderData, INVENTION} from "./Invention";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {ICharacter} from "../Characters/Character";
import {IPawnService} from "../Pawns/PawnService";

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
    fireplace: boolean;
    isBuilt: (invention: INVENTION) => boolean;

    useInvention: (name: string) => void;

    resetCardPawns: () => void;

    onMapExplore: () => void;

    renderData: IInventionServiceRenderData;
}
