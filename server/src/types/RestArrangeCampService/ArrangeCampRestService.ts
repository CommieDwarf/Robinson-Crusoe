import {ICharacter} from "../Characters/Character";

export interface IArrangeCampRestService {
    pawnAmount: {
        rest: number;
        arrangeCamp: number;
    };
    arrangeCampBonus: "determination" | "morale" | null;
    renderData: IArrangeCampRestServiceRenderData;
    rest: (character: ICharacter) => void;
    arrangeCamp: (character: ICharacter, useBible: boolean) => void;

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
