import ActionSlot from "../components/Game/UI/ActionSlot";

import { IPawnRenderData } from "../interfaces/Pawns/Pawn";
import { IInventionRenderData } from "../interfaces/InventionService/Invention";
import { IConstructionRenderData } from "../interfaces/ConstructionService/Construction";
import { ACTION_ITEM, getDroppableID } from "./getDroppableID";
import { ACTION } from "../interfaces/ACTION";

export default function getHelperActionSlots(
  object: IInventionRenderData | IConstructionRenderData,
  actionSlots: Map<string, IPawnRenderData | null>
) {
  const helperActionSlots = [];
  for (let i = 0; i < object.requiredHelpersAmount + 1; i++) {
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
    let helperPawn = actionSlots.get(actionSlotId);
    helperPawn = helperPawn ? helperPawn : null;
    helperActionSlots.push(
      <ActionSlot
        type={"helper"}
        pawn={helperPawn}
        action={ACTION.BUILD}
        context={context}
        id={actionSlotId}
        key={actionSlotId}
      />
    );
  }
  return helperActionSlots;
}
