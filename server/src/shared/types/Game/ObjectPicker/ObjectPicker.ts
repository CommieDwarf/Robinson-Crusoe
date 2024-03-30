import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IInvention} from "@shared/types/Game/InventionService/Invention";
import {IItem} from "@shared/types/Game/Equipment/Item";
import {IToken} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayerCharacter, IPlayerCharacterRenderData} from "@shared/types/Game/Characters/PlayerCharacter";
import {TileType} from "@shared/types/Game/TileService/TileResourceInfo";

export type PickableObject = IBeast | IInvention | IItem | IToken | TileType | ICharacter;
export type PickSubject = "beast" | "invention" | "item" | "token" | "tileType" | "character";

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
    renderData: IObjectPickerRenderData<T>;
}


export interface IObjectPickerRenderData<T extends PickableObject> {
    objects: PickableRenderData<T>[];
    pickSubject: PickSubject;
    picker: IPlayerCharacterRenderData;
    amount: number;
    source: string;
    id: string;
}

