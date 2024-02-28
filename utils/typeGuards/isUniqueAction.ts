import {ACTION, ACTION_ITEM, UniqueAction} from "../../interfaces/ACTION";


export function actionToUniqueAction(action: ACTION, actionItem: ACTION_ITEM): UniqueAction {
    switch (true) {
        case action === ACTION.GATHER:
            return ACTION.GATHER;
        case action === ACTION.EXPLORE:
            return ACTION.EXPLORE;
        case actionItem === ACTION_ITEM.CONSTRUCTION:
            return ACTION_ITEM.CONSTRUCTION;
        case actionItem === ACTION_ITEM.INVENTION:
            return ACTION_ITEM.INVENTION;
        case action === ACTION.THREAT:
            return ACTION.THREAT;
        case action === ACTION.REST:
            return ACTION.REST;
        case action === ACTION.ARRANGE_CAMP:
            return ACTION.ARRANGE_CAMP;
        case action === ACTION.HUNT:
            return ACTION.HUNT;
        default:
            throw new Error(`Some case is not included or passed wrong arguments. Action: ${action}, ActionItem: ${actionItem}`)
    }
}
