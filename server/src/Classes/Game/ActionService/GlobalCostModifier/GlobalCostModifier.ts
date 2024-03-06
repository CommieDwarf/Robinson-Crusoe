import {IGlobalCostModifier} from "@shared/types/Game/ActionService/GlobalCostModifier";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";


export class GlobalCostModifier implements IGlobalCostModifier {

    private readonly _resource: "helper" | keyof IBasicResourcesAmount;
    private readonly _disposable: boolean;
    private readonly _source: string;

    private _satisfiedInItem: {
        item: null,
        droppableLeaderId: string,
    } | null = null;

    constructor(resource: "helper" | keyof IBasicResourcesAmount, disposable: boolean, source: string) {
        this._resource = resource;
        this._disposable = disposable;
        this._source = source;
    }

    get renderData() {
        return {
            resource: this._resource,
            disposable: this._disposable,
            source: this._source,
            satisfiedInItem: this._satisfiedInItem,
        }
    }

    get resource(): "helper" | keyof IBasicResourcesAmount {
        return this._resource;
    }

    get disposable(): boolean {
        return this._disposable;
    }

    get source(): string {
        return this._source;
    }

    get satisfiedInItem(): { item: null; droppableLeaderId: string } | null {
        return this._satisfiedInItem;
    }

    set satisfiedInItem(value: { item: null; droppableLeaderId: string } | null) {
        this._satisfiedInItem = value;
    }

}
