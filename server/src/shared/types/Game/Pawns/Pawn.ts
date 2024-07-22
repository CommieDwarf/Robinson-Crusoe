import {IInvention} from "../InventionService/Invention";
import {ICharacter} from "../Characters/Character";
import {ITreasureMysteryCard} from "../MysteryService/MysteryCard";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";


export type IPawnOwner = IInvention | ITreasureMysteryCard | ICharacter;
export type IPawnOwnerRenderData = IPawnOwner["renderData"];

export interface IPawn<Owner extends IPawnOwner = IPawnOwner> {
    disposable: boolean;
    action: PAWN_HELPER_ACTION | null;
    disposed: boolean;
    owner: Owner;
    draggableId: string;

    renderData: IPawnRenderData<Owner["renderData"]>;
}

export interface IPawnRenderData<OwnerRenderData extends IPawnOwnerRenderData> {
    draggableId: string;
    disposable: boolean;
    action: PAWN_HELPER_ACTION | null;
    owner: Omit<OwnerRenderData, "pawnService">
    color?: PLAYER_COLOR,
}

export enum PAWN_HELPER_ACTION {
    GATHER = "gather",
    EXPLORE = "explore",
    BUILD = "build",
    HUNT = "hunt",
    GATHER_EXPLORE = "gather explore",
}
