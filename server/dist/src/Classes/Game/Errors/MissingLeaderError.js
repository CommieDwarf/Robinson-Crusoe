"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingLeaderError = void 0;
class MissingLeaderError extends Error {
    constructor(droppableID) {
        super();
        this._droppableID = droppableID;
    }
    get droppableID() {
        return this._droppableID;
    }
}
exports.MissingLeaderError = MissingLeaderError;
//# sourceMappingURL=MissingLeaderError.js.map