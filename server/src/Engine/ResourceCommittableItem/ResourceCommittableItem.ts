import {ACTION, ACTION_ITEM} from "../../types/ACTION";
import {IGame} from "../../types/Game";
import {AssignablePawnsItem} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData,
    SingleResourceRequirement
} from "../../types/ResourceCommitableItem/ResourceCommittableItem";


export abstract class ResourceCommittableItem<Resource extends "leather" | "wood" | "food" | "dryFood"> extends AssignablePawnsItem implements IResourceCommittableItem<Resource> {


    protected readonly _action: ACTION;
    protected _resourceCost: SingleResourceRequirement<Resource> | null = null;
    protected _optionalResourceCost: SingleResourceRequirement<Resource> | null = null;
    protected _committedResources: SingleResourceRequirement<Resource> | null = null;


    protected constructor(action: ACTION, actionItem: ACTION_ITEM, game: IGame, resource: SingleResourceRequirement<Resource> | null = null, optionalResource: SingleResourceRequirement<Resource> | null = null) {
        super(action, actionItem, game);
        this._action = action;
        this._resourceCost = resource;
        this._optionalResourceCost = optionalResource;
    }

    get renderData() {
        return {
            ...this.getResourceCommittableRenderData()
        }
    }


    get resourceCost(): SingleResourceRequirement<Resource> | null {
        if (!this._resourceCost) {
            return null;
        }
        return this.getGloballyModifiedResourceAmount(this._resourceCost);
    }

    get optionalResourceCost(): SingleResourceRequirement<Resource> | null {
        if (!this._optionalResourceCost) {
            return null;
        }

        return this.getGloballyModifiedResourceAmount(this._optionalResourceCost);
    }

    get committedResources(): SingleResourceRequirement<Resource> | null {
        return this._committedResources;
    }

    protected getResourceCommittableRenderData(): IResourceCommittableItemRenderData<Resource> {
        return {
            ...this.getAssignablePawnsRenderData(),
            committedResources: this._committedResources,
            resourceCost: this.resourceCost,
            optionalResourceCost: this.optionalResourceCost,
        }
    }

    public commitResource() {
        if (!this.resourceCost) {
            return;
        }
        if (this._game.resourceService.canAffordResource(this.resourceCost.type, this.resourceCost.amount)) {
            this._game.resourceService.spendBasicResourceIfPossible(this.resourceCost.type, this.resourceCost.amount, "");
            this._committedResources = this.resourceCost;
        } else if (this.optionalResourceCost && this._game.resourceService.canAffordResource(this.optionalResourceCost?.type, this.optionalResourceCost?.amount)) {
            this._game.resourceService.spendBasicResourceIfPossible(this.optionalResourceCost.type, this.optionalResourceCost.amount, "");
            this._committedResources = this.optionalResourceCost;
        }
    }

    public unCommitResources() {
        if (this._committedResources?.type && this._committedResources.amount) {
            this._game.resourceService.addBasicResourceToOwned(this._committedResources.type, this._committedResources.amount, "");
        }
        this._committedResources = null;
    }

    public consumeCommittedResources() {
        this._committedResources = null;
    }

    public canCommitResource(optional: boolean): boolean {
        let requirement: SingleResourceRequirement<Resource> | null;
        if (!optional) {
            requirement = this.resourceCost
        } else {
            requirement = this.optionalResourceCost;
        }

        if (!requirement) {
            return true;
        }
        return this._game.resourceService.owned.basic.canAfford(requirement.type, requirement.amount);

    }


    private getGloballyModifiedResourceAmount(requirement: SingleResourceRequirement<Resource>): SingleResourceRequirement<Resource> {
        let amount = requirement.amount;
        if (this._game.actionService.globalCostModifiers[this._action].some((mod) => mod.resource === requirement.type)) {
            amount++;
        }
        return {
            type: requirement.type,
            amount,
        }
    }
}
