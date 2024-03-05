import {IBasicResourcesAmount} from "../Resources/Resources";

export interface IGlobalCostModifier {
    resource: "helper" | keyof IBasicResourcesAmount;
    disposable: boolean;
    source: string;
    satisfiedInItem: {
        item: null,
        droppableLeaderId: string,
    } | null;

    renderData: IGlobalCostModifierRenderData
}

export interface IGlobalCostModifierRenderData {
    resource: "helper" | keyof IBasicResourcesAmount;
    disposable: boolean;
    source: string;
    satisfiedInItem: {
        item: null,
        droppableLeaderId: string,
    } | null;
}

