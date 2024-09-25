"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdventureAction = void 0;
const ACTION_1 = require("../../types/Game/ACTION");
const isAdventureAction = (candidate) => {
    return (candidate === ACTION_1.ACTION.BUILD || candidate === ACTION_1.ACTION.EXPLORE || candidate === ACTION_1.ACTION.GATHER);
};
exports.isAdventureAction = isAdventureAction;
//# sourceMappingURL=isAdventureAction.js.map