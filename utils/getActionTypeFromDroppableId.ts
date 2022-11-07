import { IPawn } from "../interfaces/Pawns/Pawn";
import { inventionList } from "../server/constants/inventionList";
import { Action } from "../interfaces/Action";

export function getActionTypeFromDroppableId(droppableId: string): Action {
  if (droppableId.includes("structure") || droppableId.includes("invention")) {
    return "build";
  } else if (droppableId.includes("gather")) {
    return "gather";
  } else if (droppableId.includes("expore")) {
    return "explore";
  } else if (droppableId.includes("hunt")) {
    return "hunt";
  } else if (droppableId.includes("rest")) {
    return "rest";
  } else if (droppableId.includes("arrangeCamp")) {
    return "arrangeCamp";
  } else if (droppableId.includes("threat")) {
    return "threat";
  } else if (droppableId.includes("hunt")) {
    return "hunt";
  }

  throw new Error("Droppable id is invalid: " + droppableId);
}
