import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IInvention} from "@shared/types/Game/InventionService/Invention";
import {IItem} from "@shared/types/Game/Equipment/Item";
import {IToken} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayerCharacter, IPlayerCharacterRenderData} from "@shared/types/Game/Characters/PlayerCharacter";
import {TileType} from "@shared/types/Game/TileService/TileResourceInfo";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";


export interface PickableConstruction {
    name: CONSTRUCTION
}

export type PickableObject = IBeast | IInvention | IItem | IToken | TileType | ICharacter | PickableConstruction;
export type PickSubject =
    "beast"
    | "invention"
    | "item"
    | "token"
    | "tileType"
    | "character"
    | "construction"
    | "custom";

export type Pickable<T extends PickableObject> = {
    object: T,
    id: string,
}


export type PickableRenderData<T extends PickableObject> = {
    object: T extends { renderData: any } ? T["renderData"] : T,
    id: string;
}

export interface IObjectPicker<T extends PickableObject> {
    objects: Pickable<T>[];
    picker: IPlayerCharacter;

    pickSubject: PickSubject;
    amount: number;
    source: string;
    id: string;

    hasSecondEffect: () => boolean;
    renderData: IObjectPickerRenderData<T>;
}


export interface IObjectPickerRenderData<T extends PickableObject> {
    objects: PickableRenderData<T>[];
    pickSubject: PickSubject;
    picker: IPlayerCharacterRenderData;
    hasSecondEffect: boolean;
    amount: number;
    source: string;
    id: string;
}

