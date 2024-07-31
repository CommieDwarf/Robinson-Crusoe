import {ACTION, ACTION_ITEM} from "@shared/types/Game/ACTION";
import {IGame} from "@shared/types/Game/Game";
import {AssignablePawnsItem} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData,
    SingleResourceRequirement
} from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";
import {IPawnOwner} from "@shared/types/Game/Pawns/Pawn";
import {isPlayerCharacter} from "@shared/utils/typeGuards/isPlayerCharacter";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";


export abstract class ResourceCommittableItem<Resource extends "leather" | "wood" | "food" | "dryFood">
    extends AssignablePawnsItem implements IResourceCommittableItem<Resource> {


    protected readonly _action: ACTION;
    protected _resourceCost: SingleResourceRequirement<Resource> | null = null;
    protected _optionalResourceCost: SingleResourceRequirement<Resource> | null = null;
    protected _committedResources: SingleResourceRequirement<Resource> | null = null;
    protected _personalResourceUsed: boolean = false;
    protected _pawnOwner: IPawnOwner | null = null;


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

    get secondaryResourceCost(): SingleResourceRequirement<Resource> | null {
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
            optionalResourceCost: this.secondaryResourceCost,
            personalResourceUsed: this._personalResourceUsed,
        }
    }

    public commitResource(pawnOwner: IPawnOwner) {
        if (!this.resourceCost) {
            return;
        }

        let cost;
        const primaryCostModified = this.getCostIncludingPersonalResource(this.resourceCost, pawnOwner);
        const secondaryCostModified = this._optionalResourceCost ? this.getCostIncludingPersonalResource(this._optionalResourceCost, pawnOwner) : undefined;
        let modified = false;
        if (this._game.resourceService.canAffordResource(primaryCostModified.type, primaryCostModified.amount)) {
            cost = primaryCostModified;
            modified = this._resourceCost?.amount !== cost.amount;
        } else if (secondaryCostModified && this._game.resourceService.canAffordResource(secondaryCostModified.type, secondaryCostModified.amount)) {
            cost = secondaryCostModified
            modified = this._optionalResourceCost?.amount !== cost.amount;
        }

        if (!cost) {
            throw new Error("Can't afford resource")
        }

        this._pawnOwner = pawnOwner;
        if (modified && isPlayerCharacter(pawnOwner)) {
            this._personalResourceUsed = true;
            pawnOwner.setPersonalResource(cost.type, false);
        }

        this._game.resourceService.spendBasicResourceIfPossible(cost.type, cost.amount, "");
        this._committedResources = cost;
    }

    public unCommitResources() {
        if (!this._committedResources) {
            return;
        }
        if (this._committedResources.type && this._committedResources.amount) {
            this._game.resourceService.addBasicResourceToOwned(this._committedResources.type, this._committedResources.amount, "");
        }
        if (this._personalResourceUsed && this._pawnOwner && isPlayerCharacter(this._pawnOwner)) {
            this._personalResourceUsed = false;
            this._pawnOwner.setPersonalResource(this._committedResources.type, true);
        }
        this._pawnOwner = null;
        this._committedResources = null;
    }

    public consumeCommittedResources() {
        this._committedResources = null;
        this._personalResourceUsed = false;
        this._pawnOwner = null;
    }

    public canCommitResource(secondary: boolean, pawnOwner: IPawnOwner): boolean {
        let requirement: SingleResourceRequirement<Resource> | null;
        if (!secondary) {
            requirement = this.resourceCost
        } else {
            requirement = this.secondaryResourceCost;
        }

        if (!requirement) {
            return true;
        }

        const modifiedAmount = this.getCostIncludingPersonalResource(requirement, pawnOwner).amount;


        return this._game.resourceService.owned.basic.canAfford(requirement.type, modifiedAmount);
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

    private getCostIncludingPersonalResource(requirement: SingleResourceRequirement<Resource>, pawnOwner: IPawnOwner) {
        if (!isPlayerCharacter(pawnOwner)) {
            return requirement;
        }
        let amount = requirement.amount;

        if (pawnOwner.hasPersonalResource[requirement.type]) {
            amount--;
        }

        return {
            type: requirement.type,
            amount
        }

    }
}


