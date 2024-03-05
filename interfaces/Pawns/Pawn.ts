import {IPlayerCharacter, IPlayerCharacterRenderData} from "../Characters/PlayerCharacter";
import {ISkillRenderData} from "../Skill/Skill";
import {IInvention, IInventionRenderData} from "../InventionService/Invention";
import {ICharacter, ICharacterRenderData} from "../Characters/Character";
import {ITreasureMysteryCard, ITreasureMysteryCardRenderData} from "../MysteryService/MysteryCard";


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
}

export enum PAWN_HELPER_ACTION {
    GATHER = "gather",
    EXPLORE = "explore",
    BUILD = "build",
    HUNT = "hunt",
    GATHER_EXPLORE = "gather explore",
}
