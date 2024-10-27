import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IInvention} from "@shared/types/Game/InventionService/Invention";
import {IItem} from "@shared/types/Game/Equipment/Item";
import {IToken} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayerCharacter, IPlayerCharacterRenderData} from "@shared/types/Game/Characters/PlayerCharacter";
import {TileType} from "@shared/types/Game/TileService/TileResourceInfo";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";


export interface ChoosableConstruction {
    name: CONSTRUCTION
}

export type ChoosableObject = IBeast | IInvention | IItem | IToken | TileType | ICharacter | ChoosableConstruction;
export type ChoiceSubject =
    "beast"
    | "invention"
    | "item"
    | "token"
    | "tileType"
    | "character"
    | "construction"
    | "custom";

export type Choosable<T extends ChoosableObject> = {
    object: T,
    id: string,
}


export type ChoosableRenderData<T extends ChoosableObject> = {
    object: T extends { renderData: any } ? T["renderData"] : T,
    id: string;
}

export interface IChoiceSelector<T extends ChoosableObject> {
    objects: Choosable<T>[];
    picker: IPlayerCharacter;

    pickSubject: ChoiceSubject;
    amount: number;
    source: string;
    id: string;

    hasSecondEffect: () => boolean;
    renderData: IChoiceSelectorRenderData<T>;
}


export interface IChoiceSelectorRenderData<T extends ChoosableObject> {
    objects: ChoosableRenderData<T>[];
    pickSubject: ChoiceSubject;
    picker: IPlayerCharacterRenderData;
    hasSecondEffect: boolean;
    amount: number;
    source: string;
    id: string;
}

