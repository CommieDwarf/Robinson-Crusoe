import {IPawn, IPawnRenderData} from "../Pawns/Pawn";
import {
    IConstruction,
    IConstructionRenderData,
} from "../ConstructionService/Construction";
import {
    IInvention,
    IInventionRenderData,
} from "../InventionService/Invention";
import {ITile, ITileRenderData} from "../TileService/ITile";
import {IEventCard, IEventCardRenderData} from "../EventService/EventCard";
import {IBeast, IBeastRenderData} from "../Beasts/Beast";
import {ACTION, AdventureAction} from "../ACTION";
import {ActionDice, ActionDiceResults} from "../RollDice/RollDice";

export type Item =
    | IConstruction
    | IInvention
    | ITile
    | IEventCard
    | IBeast
    | ACTION.ARRANGE_CAMP
    | ACTION.REST;

export interface IResolvableItem {
    item: Item;
    id: string;
    leaderPawn: IPawn;
    resolved: boolean;
    action: ACTION;
    droppableID: string;
    resolveStatus: RESOLVE_ITEM_STATUS;
    renderData: IResolvableItemRenderData;
    helperAmount: number;
    reRolledSuccess: boolean;
    reRolledDice: ActionDice | null;
    shouldRollDices: boolean;
    shouldReRollSuccess: boolean;
    rollDiceResults: ActionDiceResults | null;
    reRollSuccess: () => void;
    reRollDice: (dice: ActionDice, action: AdventureAction) => void;

    rollDices: () => void;
    resolve: () => void;

    bibleChecked: boolean;


}

export enum RESOLVE_ITEM_STATUS {
    PENDING = "pending",
    SUCCESS = "success",
    FAILURE = "failure",
}

export interface IResolvableItemRenderData {
    itemName: string;
    item:
        | IEventCardRenderData
        | IBeastRenderData
        | ITileRenderData
        | IConstructionRenderData
        | IInventionRenderData
        | ACTION.REST
        | ACTION.ARRANGE_CAMP;
    id: string;
    leaderPawn: IPawnRenderData;
    droppableID: string;
    resolveStatus: RESOLVE_ITEM_STATUS;
    action: ACTION;
    shouldRollDices: boolean;
    shouldReRollSuccess: boolean;
    reRolledSuccess: boolean;
    reRolledDice: ActionDice | null;
    rollDiceResults: ActionDiceResults | null;

    canBibleBeUsed: boolean;
    bibleChecked: boolean;
}
