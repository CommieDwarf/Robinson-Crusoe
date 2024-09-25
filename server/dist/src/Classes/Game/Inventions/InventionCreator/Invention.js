"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invention = void 0;
const ACTION_1 = require("../../../../shared/types/Game/ACTION");
const ResourceCommittableItem_1 = require("../../ResourceCommittableItem/ResourceCommittableItem");
const PawnService_1 = require("../../PawnService/PawnService");
class Invention extends ResourceCommittableItem_1.ResourceCommittableItem {
    constructor(name, requirements, inventionType, game, resourceCost = null, optionalResource = null) {
        super(ACTION_1.ACTION.BUILD, ACTION_1.ACTION_ITEM.INVENTION, game, resourceCost, optionalResource);
        this._locked = true;
        this._resourceChoice = false;
        this._built = false;
        this._belongsTo = null;
        this._used = false;
        this._pawnService = new PawnService_1.PawnService(this._game, this);
        this._name = name;
        this._logSource = name;
        this._requirements = requirements;
        this._inventionType = inventionType;
    }
    get renderData() {
        return Object.assign(Object.assign({}, this.getPawnOwnerRenderData()), { pawnService: this._pawnService.renderData });
    }
    getPawnOwnerRenderData() {
        return Object.assign(Object.assign({ name: this.name, locked: this.locked, inventionType: this._inventionType, isBuilt: this.isBuilt }, super.getResourceCommittableRenderData()), { canBeUsed: this.canBeUsed });
    }
    get canBeUsed() {
        return false;
    }
    get pawnService() {
        return this._pawnService;
    }
    get resourceChoice() {
        return this._resourceChoice;
    }
    get belongsTo() {
        return this._belongsTo;
    }
    get isBuilt() {
        return this._built;
    }
    set isBuilt(value) {
        this._built = value;
    }
    get name() {
        return this._name;
    }
    get locked() {
        return this._locked;
    }
    set locked(value) {
        this._locked = value;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    get inventionType() {
        return this._inventionType;
    }
    get requirements() {
        return this._requirements;
    }
    get namePL() {
        return this._namePL;
    }
    onBuild() {
        return;
    }
    onDestruction() {
        this.isBuilt = false;
        return;
    }
    onNextRound() {
        return;
    }
    use(character) {
        return;
    }
}
exports.Invention = Invention;
//# sourceMappingURL=Invention.js.map