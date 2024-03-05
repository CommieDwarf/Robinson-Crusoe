import {ACTION} from "../../Server/src/ACTION";
import {IPawn} from "./Pawns/Pawn";

export interface IActionSlotServiceRenderData {
    slots: Object;
    pawnDropIDAlert: string | null;
}

export type OccupiedSlots = {
    [key in ACTION]: Map<string, IPawn<any>>;
};

export interface IActionSlotService {
    slots: Map<string, IPawn<any> | null>;
    setPawn: (droppableId: string, pawn: IPawn<any>) => void;
    unsetPawn: (droppableId: string) => void;
    clearSlots: () => void;
    getPawn: (droppableId: string) => IPawn<any> | null;
    renderData: IActionSlotServiceRenderData;
    getOccupiedActionSlots: () => OccupiedSlots;
    pawnDropIDAlert: string | null;
}

