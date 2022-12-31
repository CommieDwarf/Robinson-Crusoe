import { ACTION } from "../interfaces/ACTION";

export function getActionTypeFromDroppableId(droppableId: string): ACTION {
  if (droppableId.includes("structure") || droppableId.includes("invention")) {
    return ACTION.BUILD;
  } else if (droppableId.includes("gather")) {
    return ACTION.GATHER;
  } else if (droppableId.includes("explore")) {
    return ACTION.EXPLORE;
  } else if (droppableId.includes("hunt")) {
    return ACTION.HUNT;
  } else if (droppableId.includes("rest")) {
    return ACTION.REST;
  } else if (droppableId.includes("arrangeCamp")) {
    return ACTION.ARRANGE_CAMP;
  } else if (droppableId.includes("threat")) {
    return ACTION.THREAT;
  } else if (droppableId.includes("hunt")) {
    return ACTION.HUNT;
  }

  throw new Error("Droppable id is invalid: " + droppableId);
}
