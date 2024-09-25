"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCostModifier = void 0;
class GlobalCostModifier {
    constructor(resource, disposable, source) {
        this._satisfiedInItem = null;
        this._resource = resource;
        this._disposable = disposable;
        this._source = source;
    }
    get renderData() {
        return {
            resource: this._resource,
            disposable: this._disposable,
            source: this._source,
            satisfiedInItem: this._satisfiedInItem,
        };
    }
    get resource() {
        return this._resource;
    }
    get disposable() {
        return this._disposable;
    }
    get source() {
        return this._source;
    }
    get satisfiedInItem() {
        return this._satisfiedInItem;
    }
    set satisfiedInItem(value) {
        this._satisfiedInItem = value;
    }
}
exports.GlobalCostModifier = GlobalCostModifier;
//# sourceMappingURL=GlobalCostModifier.js.map