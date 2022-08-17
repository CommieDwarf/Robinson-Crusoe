import ActionSlot from "../components/game/interface/ActionSlot";

import { IPawn } from "../interfaces/Pawns/Pawn";
import { IStructure, STRUCTURE } from "../interfaces/Structures/Structure";
import { IInvention, INVENTION_TYPE } from "../interfaces/Inventions/Invention";

export default function getHelperActionSlots(
  object: IStructure | IInvention,
  actionSlots: Map<string, IPawn | null>
) {
  const helperActionSlots = [];
  for (let i = 0; i < object.requiredHelpersAmount + 1; i++) {
    let actionSlotId;
    let context: "invention" | "structure";
    if ("lvl" in object) {
      actionSlotId = "structure-" + object.name + "-helper-" + (i + 1);
      context = "structure";
    } else {
      actionSlotId = "invention-" + object.name + "-helper-" + (i + 1);
      context = "invention";
    }
    let helperPawn = actionSlots.get(actionSlotId);
    helperPawn = helperPawn ? helperPawn : null;
    helperActionSlots.push(
      <ActionSlot
        type={"helper"}
        pawn={helperPawn}
        action={"build"}
        context={context}
        id={actionSlotId}
        key={actionSlotId}
      />
    );
  }
  return helperActionSlots;
}
