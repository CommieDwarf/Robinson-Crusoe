import {IResolvableItem, IResolvableItemRenderData} from "./IResolvableItem";
import {ACTION, AdventureAction} from "../ACTION";
import {IGlobalCostModifier, IGlobalCostModifierRenderData} from "./GlobalCostModifier";
import {IBasicResourcesAmount} from "../Resources/Resources";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";

export interface ActionTokens {
    build: boolean;
    gather: boolean;
    explore: boolean;
}


export type GlobalCostModifiers = Record<ACTION, IGlobalCostModifier[]>;

export interface IActionService {

    globalCostModifiers: GlobalCostModifiers;
    resolvableItems: IResolvableItem[];
    action: ACTION;
    finished: boolean;
    setNextAction: () => void;
    loadItems: () => void;
    resolve: (resolvableItemID: string) => void;
    rollDices: (resolvableItemID: string) => void;
    reRollSuccess: (resolvableItemID: string) => void;

    reRollDice: (dice: ActionDice) => void;

    skippableActions: ACTION[];
    setAdventureToken: (
        action: AdventureAction,
        value: boolean,
        logSource: string
    ) => void;
    setReRollToken: (
        action: AdventureAction,
        value: boolean,
        sourceLog: string
    ) => void;


    bibleUses: number;
    hasGlobalModifier: (action: ACTION, resource: "helper" | keyof IBasicResourcesAmount) => boolean;
    addGlobalCostModifier: (action: ACTION, resource: "helper" | keyof IBasicResourcesAmount, disposable: boolean, source: string) => void;
    removeGlobalCostModifier: (action: ACTION, source: string) => void;

    currentActionResolved: boolean;
    lastRolledItem: IResolvableItem | null;
    renderData: IActionServiceRenderData;
    adventureTokens: ActionTokens;
    reRollTokens: ActionTokens;


    setBibleUsage: (resolvableItemId: string, value: boolean) => void;
}

export interface IActionServiceRenderData {
    resolvableItems: IResolvableItemRenderData[];
    action: ACTION;
    finished: boolean;
    currentActionResolved: boolean;
    lastRolledItem: IResolvableItemRenderData | null;
    adventureTokens: ActionTokens;
    reRollTokens: ActionTokens;

    globalCostModifiers: Record<ACTION, IGlobalCostModifierRenderData[]>

    skippableActions: ACTION[];

}
