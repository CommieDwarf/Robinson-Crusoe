"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionSlotService = void 0;
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const ACTION_1 = require("@shared/types/Game/ACTION");
const MissingLeaderError_1 = require("../Errors/MissingLeaderError");
const MissingHelperError_1 = require("../Errors/MissingHelperError");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const getActionSlotDroppableId_1 = require("@shared/utils/getActionSlotDroppableId");
const isEventCard_1 = require("@shared/utils/typeGuards/isEventCard");
const getItemFromDroppableId_1 = require("../../../utils/getItemFromDroppableId");
class ActionSlotService {
    constructor(game) {
        this._markedActionSlotId = null;
        this._game = game;
        this._slots = this.initActionSlots();
    }
    get renderData() {
        const slots = {};
        this.slots.forEach((pawn, slotId) => {
            if (pawn) {
                slots[slotId] = pawn.renderData;
            }
            else {
                slots[slotId] = null;
            }
        });
        return {
            slots,
            markedActionSlotId: this._markedActionSlotId,
        };
    }
    // -------------------------------------------------
    set slots(value) {
        this._slots = value;
    }
    get slots() {
        return this._slots;
    }
    get markedActionSlotId() {
        return this._markedActionSlotId;
    }
    set markedActionSlotId(value) {
        this._markedActionSlotId = value;
    }
    getOccupiedActionSlots() {
        const entries = Object.values(ACTION_1.ACTION).map((value) => [value, new Map()]);
        const categorized = Object.fromEntries(entries);
        this.slots.forEach((pawn, droppableId) => {
            if (!pawn) {
                return;
            }
            const arrDroppableId = droppableId.split("-");
            const entries = Object.entries(categorized);
            entries.forEach(([value]) => {
                if (arrDroppableId.includes(value) ||
                    (value === ACTION_1.ACTION.BUILD &&
                        ActionSlotService.isBuildCategory(droppableId))) {
                    categorized[value].set(droppableId, pawn);
                }
            });
        });
        return categorized;
    }
    // -------------------------------------------------------
    setPawn(droppableId, pawn) {
        const assignedPawn = this._slots.get(droppableId);
        this._slots.set(droppableId, pawn);
        if (assignedPawn) {
            return;
        }
        if (droppableId.includes("gather")) {
        }
        else if (droppableId.includes("rest")) {
            Boolean(pawn) ? this._game.arrangeCampRestService.incrPawnAmount("rest") : this._game.arrangeCampRestService.decrPawnAmount("rest");
        }
        else if (droppableId.includes("arrange camp")) {
            Boolean(pawn) ? this._game.arrangeCampRestService.incrPawnAmount("arrangeCamp") : this._game.arrangeCampRestService.decrPawnAmount("arrangeCamp");
        }
    }
    incrPawnAmountInItem(droppableId) {
        const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableId, this._game);
    }
    unsetPawn(droppableId) {
        this._slots.set(droppableId, null);
        if (droppableId.includes("gather")) {
        }
        else if (droppableId.includes("rest")) {
            this._game.arrangeCampRestService.decrPawnAmount("rest");
        }
        else if (droppableId.includes("arrange camp")) {
            this._game.arrangeCampRestService.decrPawnAmount("arrangeCamp");
        }
    }
    clearSlots() {
        this._slots = this.initActionSlots();
    }
    getPawn(droppableId) {
        return this.slots.get(droppableId) || null;
    }
    initActionSlots() {
        const actionSlots = new Map();
        this._game.constructionService.constructions.forEach((construction) => {
            for (let i = 0; i < 4; i++) {
                actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION_ITEM.CONSTRUCTION, construction.name, null, i), null);
            }
        });
        const inventions = [
            ...Object.values(Invention_1.INVENTION_STARTER),
            ...Object.values(Invention_1.INVENTION_NORMAL),
            ...Object.values(Invention_1.INVENTION_PERSONAL),
            ...Object.values(Invention_1.INVENTION_CASTAWAYS),
        ];
        inventions.forEach((invention) => {
            for (let i = 0; i < 4; i++) {
                actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION_ITEM.INVENTION, invention, null, i), null);
            }
        });
        this._game.tileService.tiles.forEach((tile) => {
            for (let i = 0; i < 8; i++) {
                actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.GATHER, tile.id, "left", i), null);
                actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.GATHER, tile.id, "right", i), null);
                actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.EXPLORE, tile.id, null, i), null);
            }
        });
        for (let i = 0; i < 10; i++) {
            actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.REST, "", null, i), null);
            actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.ARRANGE_CAMP, "", null, i), null);
        }
        for (let i = 0; i < 2; i++) {
            actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.THREAT, " ", "left", i), null);
            actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.THREAT, " ", "right", i), null);
            actionSlots.set((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.HUNT, " ", null, i), null);
        }
        return actionSlots;
    }
    static isBuildCategory(droppableId) {
        return (droppableId.includes("invention") || droppableId.includes("construction"));
    }
    static rmvRoleInfoFromDroppableId(droppableID) {
        return droppableID.slice(0, -9);
    }
    static checkMissingPawns(occupiedSlots, game) {
        Object.entries(occupiedSlots).forEach(([category, map]) => {
            let helperItems = new Set();
            let leaderItems = new Set();
            map.forEach((pawn, droppableID) => {
                if (droppableID.includes("helper")) {
                    helperItems.add(this.rmvRoleInfoFromDroppableId(droppableID));
                }
                else {
                    leaderItems.add(this.rmvRoleInfoFromDroppableId(droppableID));
                }
            });
            //leader check
            helperItems.forEach((droppableID) => {
                if (!leaderItems.has(droppableID)) {
                    throw new MissingLeaderError_1.MissingLeaderError(droppableID);
                }
            });
            //helper check
            leaderItems.forEach((droppableID) => {
                const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableID, game);
                if (item === ACTION_1.ACTION.ARRANGE_CAMP || item === ACTION_1.ACTION.REST) {
                    return false;
                }
                let helperCount = 0;
                helperItems.forEach((hDroppableID) => {
                    if (hDroppableID === droppableID) {
                        helperCount++;
                    }
                });
                if (item && item.requiredPawnAmount && helperCount < item.requiredPawnAmount - 1
                    &&
                        !((0, isEventCard_1.isEventCard)(item) && item.name === EVENT_CARD_1.WRECKAGE_CARD.SUPPLY_CRATES)) {
                    throw new MissingHelperError_1.MissingHelperError(droppableID);
                }
            });
        });
    }
}
exports.ActionSlotService = ActionSlotService;
//# sourceMappingURL=ActionSlotService.js.map