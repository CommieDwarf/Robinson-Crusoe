import Pawn from "../interfaces/Pawns/Pawn";
import ActionSlot from "../components/game/interface/ActionSlot";
import { Invention } from "../server/Classes/Inventions/Inventions";
import { Structure } from "../server/Classes/Structures/Structures";

export default function getHelperActionSlots(
  object: Structure | Invention,
  actionSlots: Map<string, Pawn | null>
) {
  const helperActionSlots = [];
  for (let i = 0; i < object.requiredHelpers; i++) {
    let actionSlotId;
    let context: "invention" | "structure";
    if (object instanceof Structure) {
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
