import {ACTION, ACTION_ITEM} from "../../../interfaces/ACTION";
import {IGame} from "../../../interfaces/Game";
import {AssignablePawnsItem} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem, IResourceCommittableItemRenderData,
    SingleResourceRequirement
} from "../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";


export abstract class ResourceCommittableItem extends AssignablePawnsItem implements IResourceCommittableItem {


    protected readonly _action: ACTION;
    _resourceCost: SingleResourceRequirement | null = null;
    _optionalResourceCost: SingleResourceRequirement | null = null;
    protected _committedResources: SingleResourceRequirement | null = null;


    protected constructor(action: ACTION, actionItem: ACTION_ITEM, game: IGame, resource: SingleResourceRequirement | null = null, optionalResource: SingleResourceRequirement | null = null) {
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


    get resourceCost(): SingleResourceRequirement | null {
        if (!this._resourceCost) {
            return null;
        }
        return this.getGloballyModifiedResourceAmount(this._resourceCost);
    }

    get optionalResourceCost(): SingleResourceRequirement | null {
        if (!this._optionalResourceCost) {
            return null;
        }

        return this.getGloballyModifiedResourceAmount(this._optionalResourceCost);
    }

    get committedResources(): SingleResourceRequirement | null {
        return this._committedResources;
    }

    protected getResourceCommittableRenderData(): IResourceCommittableItemRenderData {
        return {
            ...this.getAssignablePawnsRenderData(),
            committedResources: this._committedResources,
            resourceCost: this.resourceCost,
            optionalResourceCost: this.optionalResourceCost,
        }
    }

    public commitResource(optional: boolean) {
        if (!optional && this.resourceCost) {
            this._game.resourceService.spendBasicResourceIfPossible(this.resourceCost.type, this.resourceCost.amount, "");
            this._committedResources = this.resourceCost;
        } else if (this.optionalResourceCost) {
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
        let requirement: SingleResourceRequirement | null;
        if (!optional) {
            requirement = this.resourceCost
        } else {
            requirement = this.optionalResourceCost;
        }

        if (!requirement) {
            return true;
        }
        console.log(requirement)
        return this._game.resourceService.owned.basic.canAfford(requirement.type, requirement.amount);

    }


    private getGloballyModifiedResourceAmount(requirement: SingleResourceRequirement): SingleResourceRequirement {
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