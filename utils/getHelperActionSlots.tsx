import ActionSlot from "../components/Game/UI/ActionSlot";

import { IInventionRenderData } from "../interfaces/InventionService/Invention";
import { IConstructionRenderData } from "../interfaces/ConstructionService/Construction";
import { ACTION_ITEM, getDroppableID } from "./getDroppableID";
import { ACTION } from "../interfaces/ACTION";

export default function getHelperActionSlots(
  object: IInventionRenderData | IConstructionRenderData
) {
  const helperActionSlots = [];
  for (let i = 0; i < object.requiredHelperAmount + 1; i++) {
    let actionSlotId;
    let context;
    if ("lvl" in object) {
      actionSlotId = getDroppableID(
        ACTION_ITEM.CONSTRUCTION,
        object.name,
        "",
        i + 1
      );
      context = ACTION_ITEM.CONSTRUCTION;
    } else {
      actionSlotId = getDroppableID(
        ACTION_ITEM.INVENTION,
        object.name,
        "",
        i + 1
      );
      context = ACTION_ITEM.INVENTION;
    }
    helperActionSlots.push(
      <ActionSlot
        type={"helper"}
        action={ACTION.BUILD}
        actionItem={context}
        id={actionSlotId}
        key={actionSlotId}
      />
    );
  }
  return helperActionSlots;
}
