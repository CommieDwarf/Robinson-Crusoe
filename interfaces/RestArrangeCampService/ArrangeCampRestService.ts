import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface IArrangeCampRestService {
    pawnAmount: {
        rest: number;
        arrangeCamp: number;
    };
    arrangeCampBonus: "determination" | "morale" | null;
    renderData: IArrangeCampRestServiceRenderData;
    rest: (character: IPlayerCharacter) => void;
    arrangeCamp: (character: IPlayerCharacter) => void;

    incrPawnAmount: (action: "rest" | "arrangeCamp") => void;
    decrPawnAmount: (action: "rest" | "arrangeCamp") => void;
}

export interface IArrangeCampRestServiceRenderData {
    pawnAmount: {
        rest: number;
        arrangeCamp: number;
    };

    arrangeCampBonus: "determination" | "morale" | null;
}
