"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionService = void 0;
const IResolvableItem_1 = require("@shared/types/Game/ActionService/IResolvableItem");
const ResolvableItem_1 = require("./ResolvableItem");
const ACTION_1 = require("@shared/types/Game/ACTION");
const Item_1 = require("@shared/types/Game/Equipment/Item");
const isAdventureAction_1 = require("@shared/utils/typeGuards/isAdventureAction");
const GlobalCostModifier_1 = require("./GlobalCostModifier/GlobalCostModifier");
const Character_1 = require("@shared/types/Game/Characters/Character");
const actionOrder_1 = require("@shared/constants/actionOrder");
const getActionSlotDroppableId_1 = require("@shared/utils/getActionSlotDroppableId");
const MissingLeaderError_1 = require("../Errors/MissingLeaderError");
const getItemFromDroppableId_1 = require("../../../utils/getItemFromDroppableId");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class ActionService {
    constructor(game) {
        this._resolvableItems = [];
        this._action = ACTION_1.ACTION.THREAT;
        this._skippableActions = [];
        this._actionIndex = 0;
        this._finished = false;
        this._occupiedSlots = new Map();
        this._lastRolledItem = null;
        this._adventureTokens = {
            build: false,
            explore: false,
            gather: false,
        };
        this._newAdventureTokens = {
            build: false,
            explore: false,
            gather: false,
        };
        this._reRollTokens = {
            build: false,
            explore: false,
            gather: false,
        };
        this._globalCostModifiers = {
            [ACTION_1.ACTION.THREAT]: [],
            [ACTION_1.ACTION.HUNT]: [],
            [ACTION_1.ACTION.BUILD]: [],
            [ACTION_1.ACTION.GATHER]: [],
            [ACTION_1.ACTION.EXPLORE]: [],
            [ACTION_1.ACTION.ARRANGE_CAMP]: [],
            [ACTION_1.ACTION.REST]: [],
        };
        this._bibleUses = 0;
        this._game = game;
    }
    get renderData() {
        var _a;
        const globalCostModifiers = Object.fromEntries(Object.entries(this._globalCostModifiers)
            .map(([key, value]) => [key, value.map((mod) => mod.renderData)]));
        return {
            action: this.action,
            currentActionResolved: this.currentActionResolved,
            finished: this.finished,
            resolvableItems: this.resolvableItems.map((resItem) => resItem.renderData),
            lastRolledItem: ((_a = this._lastRolledItem) === null || _a === void 0 ? void 0 : _a.renderData) || null,
            adventureTokens: this._adventureTokens,
            reRollTokens: this.reRollTokens,
            skippableActions: this._skippableActions,
            globalCostModifiers
        };
    }
    get globalCostModifiers() {
        return this._globalCostModifiers;
    }
    get reRollTokens() {
        return this._reRollTokens;
    }
    get skippableActions() {
        return this._skippableActions;
    }
    get currentActionResolved() {
        return !this._resolvableItems.some((resolvableItem) => resolvableItem.resolveStatus === IResolvableItem_1.RESOLVE_ITEM_STATUS.PENDING);
    }
    get adventureTokens() {
        return this._adventureTokens;
    }
    set finished(value) {
        this._finished = value;
    }
    get resolvableItems() {
        return this._resolvableItems;
    }
    get action() {
        return this._action;
    }
    get finished() {
        return this._finished;
    }
    get lastRolledItem() {
        return this._lastRolledItem;
    }
    get bibleUses() {
        return this._bibleUses;
    }
    set bibleUses(value) {
        this._bibleUses = value;
    }
    hasGlobalModifier(action, resource) {
        return this._globalCostModifiers[action].some((modifier) => modifier.resource === resource);
    }
    addGlobalCostModifier(action, resource, disposable, source) {
        this._globalCostModifiers[action].push(new GlobalCostModifier_1.GlobalCostModifier(resource, disposable, source));
    }
    removeGlobalCostModifier(action, source) {
        this._globalCostModifiers[action] = this._globalCostModifiers[action].filter((modifier) => modifier.source === source);
    }
    setAdventureToken(action, value, logSource) {
        if (this._adventureTokens[action] === value) {
            return;
        }
        if (!value) {
            this._adventureTokens[action] = value;
            return;
        }
        if (value) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.ACTION_GOT_TOKEN, subject1: "adventure", subject2: action, amount: 1
            }, "negative", logSource);
        }
        if (this._game.phaseService.phase === "action") {
            this._newAdventureTokens[action] = value;
        }
        else {
            this._adventureTokens[action] = value;
        }
    }
    finishPhase() {
        this._finished = true;
        this._actionIndex = 0;
        this._action = actionOrder_1.actionOrder[this._actionIndex];
        this._resolvableItems = [];
        this._skippableActions = [];
        this.mergeAdventureTokens();
        this.resetNewAdventureTokens();
    }
    setNextAction() {
        if (!this.currentActionResolved || this._game.mysteryService.isDrawingOn) {
            return;
        }
        this._lastRolledItem = null;
        do {
            if (this.action !== ACTION_1.ACTION.REST) {
                this._actionIndex++;
                this._action = actionOrder_1.actionOrder[this._actionIndex];
                if (this.action !== ACTION_1.ACTION.THREAT) {
                    this.loadItems();
                }
            }
            else {
                this.finishPhase();
            }
        } while (this._skippableActions.includes(this._action) && !this._finished);
    }
    setReRollToken(action, value, logSource) {
        if (this._reRollTokens[action] === value) {
            return;
        }
        if (value) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.ACTION_GOT_TOKEN,
                subject1: "reroll",
                subject2: action,
                amount: 1,
            }, "negative", logSource);
        }
        this._reRollTokens[action] = value;
    }
    setCanBeSkipped(slots) {
        const entries = Object.entries(slots);
        return entries.map(([action, map]) => {
            if (map.size === 0) {
                this._skippableActions.push(action);
            }
        });
    }
    loadItems() {
        this._bibleUses = this._game.equipmentService.hasItem(Item_1.ITEM.BIBLE) ? this._game.equipmentService.getUses(Item_1.ITEM.BIBLE) : 0;
        const allSlots = this._game.actionSlotService.getOccupiedActionSlots();
        if (this._actionIndex === 0) {
            this.setCanBeSkipped(allSlots);
        }
        this._occupiedSlots = allSlots[this._action];
        const resolvableItems = [];
        const helpers = [];
        this._occupiedSlots.forEach((pawn, droppableID) => {
            if (droppableID.includes("helper")) {
                const resolvableItem = this.getResolvableItemByDroppableID(droppableID, resolvableItems);
                if (resolvableItem) {
                    resolvableItem.helperAmount++;
                }
                else {
                    helpers.push(droppableID);
                }
            }
            else {
                const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableID, this._game);
                if (item) {
                    resolvableItems.push(new ResolvableItem_1.ResolvableItem(item, this._action, pawn, this._game, droppableID));
                }
            }
        });
        helpers.forEach((droppableID) => {
            const item = this.getResolvableItemByDroppableID(droppableID, resolvableItems);
            if (!item) {
                throw new MissingLeaderError_1.MissingLeaderError(droppableID);
            }
            else {
                item.helperAmount++;
            }
        });
        this._resolvableItems = resolvableItems;
    }
    rollDices(resolvableItemID) {
        if (this.canResolve) {
            const resolvableItem = this.getResolvableItem(resolvableItemID);
            resolvableItem.rollDices();
            this._lastRolledItem = resolvableItem;
        }
    }
    reRollSuccess(resolvableItemID) {
        if ((0, isAdventureAction_1.isAdventureAction)(this._action)) {
            this.getResolvableItem(resolvableItemID).reRollSuccess();
            this.setReRollToken(this._action, false, "");
        }
    }
    reRollDice(dice) {
        var _a;
        if ((0, isAdventureAction_1.isAdventureAction)(this._action) && this._lastRolledItem) {
            (_a = this._lastRolledItem) === null || _a === void 0 ? void 0 : _a.reRollDice(dice, this._action);
        }
    }
    get canResolve() {
        return !(this._game.adventureService.currentAdventure ||
            this._game.mysteryService.isDrawingOn);
    }
    resolve(resolvableItemID) {
        if (!this.canResolve) {
            return;
        }
        const resolvableItem = this.getResolvableItem(resolvableItemID);
        resolvableItem.resolve();
        if (resolvableItem.shouldRollDices) {
            this._lastRolledItem = resolvableItem;
        }
        if ((0, isAdventureAction_1.isAdventureAction)(resolvableItem.action) &&
            this.shouldSetAdventureCard(resolvableItem)) {
            if (resolvableItem.leaderPawn.owner.name === Character_1.CHARACTER.FRIDAY) {
                this._game.characterService.hurt(Character_1.CHARACTER.FRIDAY, 1, "Przygoda");
            }
            else {
                this._game.adventureService.setCurrentAdventure(resolvableItem);
            }
            this.setAdventureToken(resolvableItem.action, false, resolvableItem.action);
        }
        this._lastRolledItem = null;
    }
    shouldSetAdventureCard(resolvableItem) {
        var _a;
        return ((0, isAdventureAction_1.isAdventureAction)(resolvableItem.action) &&
            (((_a = resolvableItem.rollDiceResults) === null || _a === void 0 ? void 0 : _a.mystery.result) === "mystery" ||
                this._adventureTokens[resolvableItem.action]));
    }
    getResolvableItem(resolvableItemID) {
        const resItem = this._resolvableItems.find((resItem) => resItem.id === resolvableItemID);
        if (!resItem) {
            throw new Error("Couldn't find resolvable item with id: " + resolvableItemID);
        }
        return resItem;
    }
    getResolvableItemByDroppableID(droppableID, resolvableItems) {
        const { itemType, name, side } = (0, getActionSlotDroppableId_1.getDroppableIdObject)(droppableID);
        const resolvableItem = resolvableItems.find((resItem) => {
            return [itemType, name, side].every((value) => {
                return resItem.droppableID.includes(value);
            });
        });
        if (!resolvableItem) {
            throw new Error(`Resolvable item with droppableID: ${droppableID} not found.`);
        }
        return resolvableItem;
    }
    mergeAdventureTokens() {
        this._adventureTokens = {
            gather: this._adventureTokens.gather || this._newAdventureTokens.gather,
            explore: this._adventureTokens.explore || this._newAdventureTokens.explore,
            build: this._adventureTokens.build || this._newAdventureTokens.build,
        };
    }
    resetNewAdventureTokens() {
        this._newAdventureTokens = {
            gather: false,
            explore: false,
            build: false
        };
    }
    setBibleUsage(resolvableItemId, value) {
        this.getResolvableItem(resolvableItemId).bibleChecked = value;
    }
}
exports.ActionService = ActionService;
//# sourceMappingURL=ActionService.js.map