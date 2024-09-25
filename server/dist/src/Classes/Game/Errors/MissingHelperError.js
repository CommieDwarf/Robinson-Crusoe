"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingHelperError = void 0;
class MissingHelperError extends Error {
    constructor(droppableID) {
        super("Assigned helpers to this action aren't enough");
        this._droppableID = droppableID;
    }
    get droppableID() {
        return this._droppableID;
    }
}
exports.MissingHelperError = MissingHelperError;
//# sourceMappingURL=MissingHelperError.js.map