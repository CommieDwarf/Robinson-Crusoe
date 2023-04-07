import {
    IAssignablePawnsItem,
    IAssignablePawnsItemRenderData
} from "../../../interfaces/AssignablePawnsItem/AssignablePawnsItem";
import {ACTION, ACTION_ITEM, UniqueAction} from "../../../interfaces/ACTION";
import {actionToUniqueAction} from "../../../utils/isUniqueAction";
import {IGame} from "../../../interfaces/Game";

export abstract class AssignablePawnsItem implements IAssignablePawnsItem {


    protected _assignedPawnAmount: number = 0;
    protected _requiredPawnAmount: number = 2;

    protected _action: ACTION;
    protected _actionItem: ACTION_ITEM;
    protected _game: IGame;

    protected constructor(type: ACTION, actionItem: ACTION_ITEM, game: IGame) {
        this._game = game;
        this._action = type;
        this._actionItem = actionItem;
    }


    get uniqueAction(): UniqueAction {
        return actionToUniqueAction(this._action, this._actionItem);
    }


    get action(): ACTION {
        return this._action;
    }

    get actionItem(): ACTION_ITEM {
        return this._actionItem;
    }

    get assignedPawnAmount(): number {
        return this._assignedPawnAmount;
    }

    get requiredPawnAmount(): number {
        return this.getComputedRequiredPawnAmount();
    }

    set requiredPawnAmount(value: number) {
        this._requiredPawnAmount = value;
    }

    protected getRenderData(): IAssignablePawnsItemRenderData {
        return {
            assignedPawnAmount: this._assignedPawnAmount,
            requiredPawnAmount: this.getComputedRequiredPawnAmount(),
            action: this._action,
            actionItem: this._actionItem,
            uniqueAction: this.uniqueAction,
        }
    }

    public getComputedRequiredPawnAmount() {
        if (this._game.actionService.hasGlobalModifier(this._action, "helper")) {
            return this._requiredPawnAmount + 1
        } else {
            return this._requiredPawnAmount;
        }

    }

    incrPawnAmount() {
        this._assignedPawnAmount++;
    }

    decrPawnAmount() {
        this._assignedPawnAmount--;
    }

    resetPawnAmount() {
        this._assignedPawnAmount = 0;
    }
}