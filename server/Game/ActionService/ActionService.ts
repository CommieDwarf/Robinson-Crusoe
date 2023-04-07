import {
    ActionTokens, GlobalCostModifiers,
    IActionService,
    IActionServiceRenderData,
} from "../../../interfaces/ActionService/ActionService";
import {IGame} from "../../../interfaces/Game";

import {ACTION, AdventureAction} from "../../../interfaces/ACTION";
import {
    IResolvableItem,
    RESOLVE_ITEM_STATUS,
} from "../../../interfaces/ActionService/IResolvableItem";
import {getItemFromDroppableId} from "../../../utils/getItemFromDroppableId";
import {ResolvableItem} from "./ResolvableItem";
import {actionOrder} from "../../../constants/actionOrder";
import {IPawn, IPawnHelper} from "../../../interfaces/Pawns/Pawn";
import {ActionSlotService} from "../ActionSlotsService/ActionSlotService";
import {MissingLeaderError} from "../Errors/MissingLeaderError";
import {isAdventureAction} from "../../../utils/isAdventureAction";
import i18n from "../../../I18n/I18n";
import {OccupiedSlots} from "../../../interfaces/ActionSlots";
import {IGlobalCostModifierRenderData} from "../../../interfaces/ActionService/GlobalCostModifier";
import {IBasicResourcesAmount} from "../../../interfaces/Resources/Resources";
import {GlobalCostModifier} from "./GlobalCostModifier/GlobalCostModifier";
import Entries from "../../../interfaces/Entries";

export class ActionService implements IActionService {


    private readonly _game: IGame;
    private _resolvableItems: IResolvableItem[] = [];
    private _action: ACTION = ACTION.THREAT;
    private _skippableActions: ACTION[] = [];
    private _actionIndex = 0;
    private _finished: boolean = false;
    private _occupiedSlots: Map<string, IPawn | IPawnHelper> = new Map();
    private _lastRolledItem: IResolvableItem | null = null;
    private _adventureTokens: ActionTokens = {
        build: false,
        explore: false,
        gather: false,
    };
    private _reRollTokens: ActionTokens = {
        build: false,
        explore: false,
        gather: false,
    };

    private _globalCostModifiers: GlobalCostModifiers = {
        [ACTION.THREAT]: [],
        [ACTION.HUNT]: [],
        [ACTION.BUILD]: [],
        [ACTION.GATHER]: [],
        [ACTION.EXPLORE]: [],
        [ACTION.ARRANGE_CAMP]: [],
        [ACTION.REST]: [],
    }


    constructor(game: IGame) {
        this._game = game;
    }

    get renderData(): IActionServiceRenderData {
        const globalCostModifiers = Object.fromEntries(Object.entries(this._globalCostModifiers)
            .map(([key, value]) =>
                [key, value.map((mod) => mod.renderData)])) as Record<ACTION, IGlobalCostModifierRenderData[]>

        return {
            action: this.action,
            currentActionResolved: this.currentActionResolved,
            finished: this.finished,
            resolvableItems: this.resolvableItems.map(
                (resItem) => resItem.renderData
            ),
            lastRolledItem: this._lastRolledItem?.renderData || null,
            adventureTokens: this._adventureTokens,
            reRollTokens: this.reRollTokens,
            skippableActions: this._skippableActions,
            globalCostModifiers
        };
    }


    get globalCostModifiers(): GlobalCostModifiers {
        return this._globalCostModifiers;
    }


    get reRollTokens(): ActionTokens {
        return this._reRollTokens;
    }

    get skippableActions(): ACTION[] {
        return this._skippableActions;
    }

    get currentActionResolved() {
        return !this._resolvableItems.some(
            (resolvableItem) =>
                resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
        );
    }

    get adventureTokens(): ActionTokens {
        return this._adventureTokens;
    }

    set finished(value: boolean) {
        this._finished = value;
    }

    get resolvableItems(): IResolvableItem[] {
        return this._resolvableItems;
    }

    get action(): ACTION {
        return this._action;
    }

    get finished(): boolean {
        return this._finished;
    }

    get lastRolledItem(): IResolvableItem | null {
        return this._lastRolledItem;
    }

    hasGlobalModifier(action: ACTION, resource: "helper" | keyof IBasicResourcesAmount): boolean {
        return this._globalCostModifiers[action].some((modifier) => modifier.resource === resource);
    }

    addGlobalCostModifier(action: ACTION, resource: "helper" | keyof IBasicResourcesAmount, disposable: boolean, source: string) {
        this._globalCostModifiers[action].push(new GlobalCostModifier(resource, disposable, source));
    }

    removeGlobalCostModifier(action: ACTION, source: string) {
        this._globalCostModifiers[action] = this._globalCostModifiers[action].filter((modifier) => modifier.source === source);
    }

    // setTimeConsumingAction(action: keyof Modifiers, value: boolean, sourceLog: string) {
    //     if (this._timeConsumingAction[action] === value) {
    //         return;
    //     }
    //     this._timeConsumingAction[action] = value;
    //     if (value) {
    //         this._game.chatLog.addMessage(
    //             `Położono token dodatkowego pionka na akcji: ${i18n.t(`action.${action}`, {
    //                 context: "genitive",
    //             })}`, "red", sourceLog)
    //     } else {
    //         this._game.chatLog.addMessage(
    //             `Zabrano token dodatkowego pionka z akcji: ${i18n.t(`action.${action}`, {
    //                 context: "genitive",
    //             })}`, "green", sourceLog)
    //     }
    // }

    setAdventureToken(
        action: AdventureAction,
        value: boolean,
        logSource: string
    ) {
        if (this._adventureTokens[action] === value) {
            return;
        }
        if (value) {
            this._game.chatLog.addMessage(
                `Położono token przygody na akcji: ${i18n.t(`action.${action}`, {
                    context: "genitive",
                })}`,
                "red",
                logSource
            );
        }
        this._adventureTokens[action] = value;
    }

    private finishPhase() {
        this._finished = true;
        this._actionIndex = 0;
        this._action = actionOrder[this._actionIndex];
        this._resolvableItems = [];
        this._skippableActions = [];
    }

    public setNextAction() {
        if (!this.currentActionResolved || this._game.mysteryService.isDrawingOn) {
            return;
        }
        this._lastRolledItem = null;
        do {
            if (this.action !== ACTION.REST) {
                this._actionIndex++;
                this._action = actionOrder[this._actionIndex];
                if (this.action !== ACTION.THREAT) {
                    this.loadItems();
                }
            } else {
                this.finishPhase();
            }
        } while (this._skippableActions.includes(this._action) && !this._finished);
    }

    public setReRollToken(
        action: AdventureAction,
        value: boolean,
        logSource: string
    ) {
        if (this._reRollTokens[action] === value) {
            return;
        }
        if (value) {
            this._game.chatLog.addMessage(
                `Żeton przerzutu sukcesu został umieszczony na akcji ${i18n.t(
                    `action.${action}`,
                    {context: "genitive"}
                )}`,
                "red",
                logSource
            );
        }
        this._reRollTokens[action] = value;
    }

    private setCanBeSkipped(slots: OccupiedSlots) {
        const entries = Object.entries(slots) as Entries<OccupiedSlots>;
        return entries.map(([action, map]) => {
            if (map.size === 0) {
                this._skippableActions.push(action);
            }
        });
    }

    public loadItems() {
        const allSlots = this._game.actionSlotService.getOccupiedActionSlots();
        if (this._actionIndex === 0) {
            this.setCanBeSkipped(allSlots);
        }

        this._occupiedSlots = allSlots[this._action];

        const resolvableItems: IResolvableItem[] = [];
        const helpers: string[] = [];
        this._occupiedSlots.forEach((pawn, droppableID) => {
            if (droppableID.includes("helper")) {
                const resolvableItem = this.getResolvableItemByDroppableID(
                    droppableID,
                    resolvableItems
                );
                if (resolvableItem) {
                    resolvableItem.helperAmount++;
                } else {
                    helpers.push(droppableID);
                }
            } else {
                const item = getItemFromDroppableId(droppableID, this._game);
                resolvableItems.push(
                    new ResolvableItem(item, this._action, pawn, this._game, droppableID)
                );
            }
        });

        helpers.forEach((droppableID) => {
            const item = this.getResolvableItemByDroppableID(
                droppableID,
                resolvableItems
            );
            if (!item) {
                throw new MissingLeaderError(droppableID);
            } else {
                item.helperAmount++;
            }
        });
        this._resolvableItems = resolvableItems;
    }

    public rollDices(resolvableItemID: string) {
        const resolvableItem = this.getResolvableItem(resolvableItemID);
        resolvableItem.rollDices();
        this._lastRolledItem = resolvableItem;
    }

    public reRollSuccess(resolvableItemID: string) {
        if (isAdventureAction(this._action)) {
            this.getResolvableItem(resolvableItemID).reRollSuccess();
            this.setReRollToken(this._action, false, "");
        }
    }

    get canResolve() {
        return !(
            this._game.adventureService.currentAdventure ||
            this._game.mysteryService.isDrawingOn
        );
    }

    public resolve(resolvableItemID: string) {
        if (!this.canResolve) {
            return;
        }
        const resolvableItem = this.getResolvableItem(resolvableItemID);
        resolvableItem.resolve();
        if (resolvableItem.shouldRollDices) {
            this._lastRolledItem = resolvableItem;
        }
        if (
            isAdventureAction(resolvableItem.action) &&
            this.shouldSetAdventureCard(resolvableItem)
        ) {
            this._game.adventureService.setCurrentAdventure(resolvableItem);
            this.setAdventureToken(
                resolvableItem.action,
                false,
                resolvableItem.action
            );
        }
    }

    private shouldSetAdventureCard(resolvableItem: IResolvableItem): boolean {
        return (
            isAdventureAction(resolvableItem.action) &&
            (resolvableItem.rollDiceResults?.mystery.result === "mystery" ||
                this._adventureTokens[resolvableItem.action])
        );
    }

    private getResolvableItem(resolvableItemID: string) {
        const resItem = this._resolvableItems.find(
            (resItem) => resItem.id === resolvableItemID
        );
        if (!resItem) {
            throw new Error(
                "Couldn't find resolvable item with id: " + resolvableItemID
            );
        }
        return resItem;
    }

    private getResolvableItemByDroppableID(
        droppableID: string,
        resolvableItems: IResolvableItem[]
    ) {
        const droppableIDRoleRemoved =
            ActionSlotService.rmvRoleInfoFromDroppableId(droppableID);
        const resolvableItem = resolvableItems.find((resItem) =>
            resItem.droppableID.includes(droppableIDRoleRemoved)
        );
        if (!resolvableItem) {
            throw new Error(
                `Resolvable item with droppableID: ${droppableIDRoleRemoved} not found.`
            );
        }

        return resolvableItem;
    }
}
