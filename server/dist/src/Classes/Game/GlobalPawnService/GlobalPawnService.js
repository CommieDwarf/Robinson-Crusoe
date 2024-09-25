"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalPawnService = void 0;
const isPawnPlacementAllowed_1 = require("@shared/utils/isPawnPlacementAllowed");
const getItemFromDroppableId_1 = require("../../../utils/getItemFromDroppableId");
const isCommittableResourcesItem_1 = require("@shared/utils/typeGuards/isCommittableResourcesItem");
class GlobalPawnService {
    constructor(game) {
        this._itemPawns = [];
        this._game = game;
    }
    get renderData() {
        return {
            allPawns: this.allPawns.map(pawn => pawn.renderData)
        };
    }
    get itemPawns() {
        return this._itemPawns;
    }
    get allPawns() {
        let pawns = [];
        this._game.characterService.allCharacters.forEach((char) => {
            pawns = pawns.concat(char.pawnService.pawns);
        });
        pawns = pawns.concat(this._itemPawns);
        return pawns;
    }
    handlePawnMovement(source, target) {
        const pawnAtSource = this.getPawnByDraggableId(source.draggableId);
        const pawnAtTarget = target.draggableId !== "" ? this.getPawnByDraggableId(target.draggableId) : null;
        if (!this.canPawnBeMoved(pawnAtSource, target.droppableId)) {
            return;
        }
        if (pawnAtTarget && !this.canPawnBeMoved(pawnAtTarget, source.droppableId)) {
            return;
        }
        if (pawnAtTarget) {
            this.unsetPawn(target.droppableId, pawnAtTarget.draggableId);
        }
        this.unsetPawn(source.droppableId, pawnAtSource.draggableId);
        if (pawnAtTarget) {
            this.setPawn(source.droppableId, pawnAtTarget);
        }
        this.setPawn(target.droppableId, pawnAtSource);
    }
    resetPawns() {
        this._game.characterService.resetPawns();
        this._game.actionSlotService.clearSlots();
        this._game.arrangeCampRestService.pawnAmount.rest = 0;
        this._game.arrangeCampRestService.pawnAmount.arrangeCamp = 0;
    }
    addToItemPawns(pawn) {
        if (Array.isArray(pawn)) {
            this._itemPawns = this._itemPawns.concat(pawn);
        }
        else {
            this._itemPawns.push(pawn);
        }
    }
    removeItemPawn(draggableId) {
        this._itemPawns = this._itemPawns.filter((pawn) => pawn.draggableId !== draggableId);
    }
    getPawnByDraggableId(draggableId) {
        const pawn = this.allPawns.find((p) => p.draggableId === draggableId);
        if (!pawn) {
            throw new Error("cant find pawn with id: " + draggableId);
        }
        return pawn;
    }
    removePawnFromOwnerFreePawns(draggableId) {
        const pawn = this.allPawns.find((pawn) => pawn.draggableId === draggableId);
        if (pawn) {
            pawn.owner.pawnService.removePawn(draggableId, "freePawns");
        }
    }
    shouldCommitResources(droppableId) {
        const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableId, this._game);
        return (0, isCommittableResourcesItem_1.isCommittableResourcesItem)(item) && Boolean(item.resourceCost) && droppableId.includes("leader");
    }
    canCommitResources(droppableId, draggableId) {
        const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableId, this._game);
        if ((0, isCommittableResourcesItem_1.isCommittableResourcesItem)(item)) {
            const pawn = this.getPawnByDraggableId(draggableId);
            return item.canCommitResource(false, pawn.owner) || item.canCommitResource(true, pawn.owner);
        }
        else {
            return false;
        }
    }
    unsetPawn(droppableId, draggableId) {
        const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableId, this._game);
        const pawn = this.getPawnByDraggableId(draggableId);
        if ((0, isCommittableResourcesItem_1.isCommittableResourcesItem)(item) && droppableId.includes("leader")) {
            item.unCommitResources(pawn.owner);
        }
        if (droppableId.includes("owner")) {
            this.removePawnFromOwnerFreePawns(draggableId);
        }
        else {
            this._game.actionSlotService.unsetPawn(droppableId);
        }
    }
    setPawn(droppableId, pawn) {
        if (!this.canPawnBeMoved(pawn, droppableId)) {
            return;
        }
        if (droppableId.includes("owner")) {
            pawn.owner.pawnService.copyPawnToFreePawns(pawn.draggableId);
        }
        else {
            if (this.shouldCommitResources(droppableId) && this.canCommitResources(droppableId, pawn.draggableId)) {
                const item = (0, getItemFromDroppableId_1.getItemFromDroppableId)(droppableId, this._game);
                item.commitResource(pawn.owner);
            }
            this._game.actionSlotService.setPawn(droppableId, pawn);
        }
    }
    canPawnBeMoved(pawn, droppableId) {
        return (0, isPawnPlacementAllowed_1.isPawnPlacementAllowed)(pawn.renderData, droppableId)
            && (!this.shouldCommitResources(droppableId) || this.canCommitResources(droppableId, pawn.draggableId));
    }
}
exports.GlobalPawnService = GlobalPawnService;
//# sourceMappingURL=GlobalPawnService.js.map