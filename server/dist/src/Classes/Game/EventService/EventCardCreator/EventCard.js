"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCard = void 0;
const ACTION_1 = require("@shared/types/Game/ACTION");
const ResourceCommittableItem_1 = require("../../ResourceCommittableItem/ResourceCommittableItem");
const getActionSlotDroppableId_1 = require("@shared/utils/getActionSlotDroppableId");
//TODO: implement scenario translations
class EventCard extends ResourceCommittableItem_1.ResourceCommittableItem {
    constructor(name, type, requirements, game) {
        const resourceRequirement = requirements.resource ? { type: requirements.resource, amount: 1 } : null;
        super(ACTION_1.ACTION.THREAT, ACTION_1.ACTION_ITEM.THREAT, game, resourceRequirement);
        this._name = name;
        this._cardType = type;
        this._requirements = requirements;
        this._requiredPawnAmount = this._requirements.pawns;
    }
    get renderData() {
        return Object.assign({ name: this.name, cardType: this._cardType, meetsRequirement: this.meetsRequirement() }, super.getResourceCommittableRenderData());
    }
    get name() {
        return this._name;
    }
    get namePL() {
        return this._namePL;
    }
    get resolutionPL() {
        return this._resolutionPL;
    }
    get cardType() {
        return this._cardType;
    }
    meetsRequirement() {
        const meetsResource = this._requirements.resource ? this._game.resourceService.canAffordResource(this._requirements.resource, 1) : true;
        const meetsConstruction = this._requirements.construction ? this._game.constructionService.getConstruction(this._requirements.construction.type).lvl >= this._requirements.construction.lvl : true;
        const meetsInvention = this._requirements.invention ? this._game.inventionService.isBuilt(this._requirements.invention) : true;
        return meetsResource && meetsConstruction && meetsInvention;
    }
    getLeaderCharacter() {
        var _a;
        return (_a = this.getPawn(0)) === null || _a === void 0 ? void 0 : _a.owner;
    }
    getHelperPawn() {
        return this.getPawn(1);
    }
    getPawn(id) {
        const slot = this._game.eventService.getSlotByCardName(this._name);
        const actionSlotId = (0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.THREAT, this._name, slot, id);
        return this._game.actionSlotService.getPawn(actionSlotId);
    }
    get requirements() {
        return this._requirements;
    }
    setAdventureToken() {
        if (this._cardType === ACTION_1.ACTION.BUILD ||
            this._cardType === ACTION_1.ACTION.EXPLORE ||
            this._cardType === ACTION_1.ACTION.GATHER) {
            this._game.actionService.setAdventureToken(this._cardType, true, this.namePL);
        }
    }
    triggerEventEffect() {
    }
    triggerThreatEffect() {
        throw new Error("triggerThreatEffect() not implemented");
    }
    fullFill() {
        throw new Error("fullFill() not implemented");
    }
    incrDetermination(amount) {
        this._game.characterService.incrDetermination(this.getLeaderCharacter(), amount, this._resolutionPL);
    }
}
exports.EventCard = EventCard;
//# sourceMappingURL=EventCard.js.map