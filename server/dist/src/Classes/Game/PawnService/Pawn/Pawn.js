"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const isInventionRenderData_1 = require("../../../../shared/utils/typeGuards/isInventionRenderData");
const isMysteryCard_1 = require("../../../../shared/utils/typeGuards/isMysteryCard");
class Pawn {
    get draggableId() {
        return this._draggableId;
    }
    constructor(owner, disposable, action, counter) {
        this._disposed = false;
        this._owner = owner;
        this._action = action;
        this._disposable = disposable;
        this._draggableId = this.generatePawnId(counter);
    }
    get renderData() {
        return {
            action: this._action,
            disposable: this._disposable,
            draggableId: this._draggableId,
            owner: this._owner.getPawnOwnerRenderData(),
        };
    }
    get action() {
        return this._action;
    }
    get disposable() {
        return this._disposable;
    }
    get disposed() {
        return this._disposed;
    }
    get owner() {
        return this._owner;
    }
    generatePawnId(counter) {
        let owner;
        if ((0, isInventionRenderData_1.isInventionRenderData)(this.owner)) {
            owner = "invention";
        }
        else if ((0, isMysteryCard_1.isMysteryCard)(this.owner)) {
            owner = "treasure";
        }
        else {
            owner = "character";
        }
        return `${this._owner.name}-pawn-${owner}-${counter}`;
    }
}
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map