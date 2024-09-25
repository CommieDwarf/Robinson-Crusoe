"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(item, game) {
        this._uses = 2;
        this._discarded = false;
        this._name = item;
        this._game = game;
    }
    get renderData() {
        return { name: this.name, uses: this.uses };
    }
    get name() {
        return this._name;
    }
    get uses() {
        return this._uses;
    }
    get game() {
        return this._game;
    }
    get hasUses() {
        return this._uses > 0;
    }
    decrementUses() {
        this._uses--;
        if (!this.hasUses) {
            this._discarded = true;
        }
    }
    use(character, target) {
        this.decrementUses();
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map