"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionToUniqueAction = void 0;
const ACTION_1 = require("@shared/types/Game/ACTION");
function actionToUniqueAction(action, actionItem) {
    switch (true) {
        case action === ACTION_1.ACTION.GATHER:
            return ACTION_1.ACTION.GATHER;
        case action === ACTION_1.ACTION.EXPLORE:
            return ACTION_1.ACTION.EXPLORE;
        case actionItem === ACTION_1.ACTION_ITEM.CONSTRUCTION:
            return ACTION_1.ACTION_ITEM.CONSTRUCTION;
        case actionItem === ACTION_1.ACTION_ITEM.INVENTION:
            return ACTION_1.ACTION_ITEM.INVENTION;
        case action === ACTION_1.ACTION.THREAT:
            return ACTION_1.ACTION.THREAT;
        case action === ACTION_1.ACTION.REST:
            return ACTION_1.ACTION.REST;
        case action === ACTION_1.ACTION.ARRANGE_CAMP:
            return ACTION_1.ACTION.ARRANGE_CAMP;
        case action === ACTION_1.ACTION.HUNT:
            return ACTION_1.ACTION.HUNT;
        default:
            throw new Error(`Some case is not included or passed wrong arguments. Action: ${action}, ActionItem: ${actionItem}`);
    }
}
exports.actionToUniqueAction = actionToUniqueAction;
//# sourceMappingURL=isUniqueAction.js.map