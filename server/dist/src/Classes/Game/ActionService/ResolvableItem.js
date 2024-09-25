"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvableItem = void 0;
const IResolvableItem_1 = require("../../../shared/types/Game/ActionService/IResolvableItem");
const Construction_1 = require("../../../shared/types/Game/ConstructionService/Construction");
const Invention_1 = require("../Inventions/InventionCreator/Invention");
const ACTION_1 = require("../../../shared/types/Game/ACTION");
const isTile_1 = require("../../../shared/utils/typeGuards/isTile");
const isAdventureAction_1 = require("../../../shared/utils/typeGuards/isAdventureAction");
const RollDiceService_1 = require("../RollDiceService/RollDiceService");
const EventCard_1 = require("../EventService/EventCardCreator/EventCard");
const isCommittableResourcesItem_1 = require("../../../shared/utils/typeGuards/isCommittableResourcesItem");
const Tile_1 = require("../TileService/Tile/Tile");
const Beast_1 = require("../BeastService/BeastCreator/Beast");
const Construction_2 = require("../ConstructionService/Construction");
class ResolvableItem {
    constructor(item, action, leaderPawn, game, droppableID) {
        this._resolved = false;
        this._helperAmount = 0;
        this._reRolledSuccess = false;
        this._reRolledDice = null;
        this._resolveStatus = IResolvableItem_1.RESOLVE_ITEM_STATUS.PENDING;
        this._rollDiceResults = null;
        this._bibleChecked = false;
        this._item = item;
        this._leaderPawn = leaderPawn;
        this._action = action;
        this._game = game;
        this._droppableID = droppableID;
    }
    get renderData() {
        let itemRenderData;
        if (this._item === ACTION_1.ACTION.REST || this._item === ACTION_1.ACTION.ARRANGE_CAMP) {
            itemRenderData = this._item;
        }
        else {
            itemRenderData = this._item.renderData;
        }
        return {
            itemName: "xD",
            item: itemRenderData,
            id: this.id,
            leaderPawn: this._leaderPawn.renderData,
            resolved: this._resolved,
            action: this._action,
            droppableID: this._droppableID,
            resolveStatus: this._resolveStatus,
            shouldRollDices: this.shouldRollDices,
            rollDiceResults: this.rollDiceResults,
            shouldReRollSuccess: this.shouldReRollSuccess,
            reRolledSuccess: this._reRolledSuccess,
            reRolledDice: this._reRolledDice,
            bibleChecked: this._bibleChecked,
            canBibleBeUsed: this.canBibleBeUsed()
        };
    }
    get reRolledDice() {
        return this._reRolledDice;
    }
    get rollDiceResults() {
        return this._rollDiceResults;
    }
    get helperAmount() {
        return this._helperAmount;
    }
    set helperAmount(value) {
        this._helperAmount = value;
    }
    set resolveStatus(value) {
        this._resolveStatus = value;
    }
    get resolveStatus() {
        return this._resolveStatus;
    }
    get droppableID() {
        return this._droppableID;
    }
    get action() {
        return this._action;
    }
    get id() {
        return this.droppableID;
    }
    get item() {
        return this._item;
    }
    get leaderPawn() {
        return this._leaderPawn;
    }
    get resolved() {
        return this._resolved;
    }
    set resolved(value) {
        this._resolved = value;
    }
    get reRolledSuccess() {
        return this._reRolledSuccess;
    }
    get shouldReRollSuccess() {
        var _a;
        if (((_a = this._rollDiceResults) === null || _a === void 0 ? void 0 : _a.success.result) === "success" &&
            (0, isAdventureAction_1.isAdventureAction)(this._action) &&
            this._game.actionService.reRollTokens[this._action] &&
            !this._reRolledSuccess) {
            {
                return true;
            }
        }
        return false;
    }
    rollDices() {
        if (!(0, isAdventureAction_1.isAdventureAction)(this._action) || !this.shouldRollDices) {
            return;
        }
        this._rollDiceResults = RollDiceService_1.RollDiceService.getActionRollDiceResults(this._action, this._game.getRandomNumber);
    }
    reRollDice(dice, action) {
        if (this._rollDiceResults) {
            this._rollDiceResults[dice] = RollDiceService_1.RollDiceService.getActionRollDiceResult(action, dice, this._game.getRandomNumber);
        }
    }
    reRollSuccess() {
        if (!this.shouldReRollSuccess) {
            return;
        }
        if ((0, isAdventureAction_1.isAdventureAction)(this._action) && this._rollDiceResults) {
            this._rollDiceResults.success = RollDiceService_1.RollDiceService.getActionRollDiceResult(this._action, "success", this._game.getRandomNumber);
            this._reRolledSuccess = true;
        }
    }
    resolve() {
        if (this.shouldReRollSuccess) {
            return;
        }
        if (this._rollDiceResults) {
            this.applyRollDiceEffects();
        }
        const item = this._item;
        if ((0, isTile_1.isTile)(item) && item.modifiers.greaterDanger) {
            if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).lvl === 0 && item.modifiers.greaterDanger.setInRound !== this._game.round) {
                this._game.characterService.hurt(this._leaderPawn.owner, 1, "Zagrożenie na kafelku - brak broni.");
            }
        }
        if (this.resolveStatus === IResolvableItem_1.RESOLVE_ITEM_STATUS.FAILURE) {
            if ((0, isCommittableResourcesItem_1.isCommittableResourcesItem)(item)) {
                item.unCommitResources(this._leaderPawn.owner);
            }
            return;
        }
        if ((0, isCommittableResourcesItem_1.isCommittableResourcesItem)(item)) {
            item.consumeCommittedResources();
        }
        this.resolveStatus = IResolvableItem_1.RESOLVE_ITEM_STATUS.SUCCESS;
        switch (true) {
            case item instanceof Construction_2.Construction:
                const construction = item;
                this._game.constructionService.lvlUpConstruction(construction.name, 1, this._leaderPawn.owner.name);
                break;
            case item instanceof Invention_1.Invention:
                const invention = item;
                this._game.inventionService.build(invention.name, this._leaderPawn.owner);
                break;
            case item instanceof Tile_1.Tile:
                const tile = item;
                if (this._action === ACTION_1.ACTION.EXPLORE) {
                    this._game.tileService.explore(tile.id);
                }
                else {
                    const side = this._droppableID.includes("left") ? "left" : "right";
                    this._game.tileService.gather([side], tile.id, this._leaderPawn.owner.name);
                }
                break;
            case item instanceof EventCard_1.EventCard:
                const eventCard = item;
                this._game.eventService.fullFill(eventCard.name);
                break;
            case item instanceof Beast_1.Beast:
                this._game.beastService.fightBeast(this._leaderPawn.owner, item);
                this._game.beastService.removeBeastFromDeck();
                break;
            case item === ACTION_1.ACTION.REST:
                this._game.arrangeCampRestService.rest(this._leaderPawn.owner);
                break;
            case item === ACTION_1.ACTION.ARRANGE_CAMP:
                this._game.arrangeCampRestService.arrangeCamp(this._leaderPawn.owner, this._bibleChecked);
                break;
        }
    }
    get shouldRollDices() {
        const item = this._item;
        if (!item ||
            item === ACTION_1.ACTION.REST ||
            item === ACTION_1.ACTION.ARRANGE_CAMP ||
            item instanceof EventCard_1.EventCard ||
            item instanceof Beast_1.Beast ||
            this._rollDiceResults) {
            return false;
        }
        return Boolean(item.requiredPawnAmount && item.requiredPawnAmount > this._helperAmount);
    }
    applyRollDiceEffects() {
        var _a, _b, _c;
        const character = this.leaderPawn.owner;
        if (((_a = this._rollDiceResults) === null || _a === void 0 ? void 0 : _a.hurt.result) === "hurt") {
            this._game.characterService.hurt(character, 1, this._action);
        }
        if (((_b = this._rollDiceResults) === null || _b === void 0 ? void 0 : _b.success.result) === "success") {
            this.resolveStatus = IResolvableItem_1.RESOLVE_ITEM_STATUS.SUCCESS;
        }
        else {
            this._game.characterService.incrDetermination(character, 2, this._action);
            this.resolveStatus = IResolvableItem_1.RESOLVE_ITEM_STATUS.FAILURE;
        }
        if (((_c = this._rollDiceResults) === null || _c === void 0 ? void 0 : _c.mystery.result) === "mystery") {
            //TODO: pull mystery card.
        }
    }
    canBibleBeUsed() {
        return this._action === "arrange camp" && this._game.actionService.bibleUses > 0;
    }
    set bibleChecked(value) {
        if (value) {
            if (this.canBibleBeUsed()) {
                this._game.actionService.bibleUses--;
                this._bibleChecked = true;
            }
        }
        else {
            this._game.actionService.bibleUses++;
            this._bibleChecked = false;
        }
    }
}
exports.ResolvableItem = ResolvableItem;
//# sourceMappingURL=ResolvableItem.js.map