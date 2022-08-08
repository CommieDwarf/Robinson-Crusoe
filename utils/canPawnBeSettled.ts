import { IPawn } from "../interfaces/Pawns/Pawn";

export function getPawnCanBeSettled(
  pawn: IPawn | null,
  destinationId: string
): boolean {
  if (!pawn) {
    return true;
  }
  if (pawn.draggableId.includes("dog")) {
    if (destinationId.includes("leader")) {
      return false;
    }
    if (destinationId === "dog-droppable") {
      return true;
    }
    if (!destinationId.includes("explore") && !destinationId.includes("hunt")) {
      return false;
    }
    if (
      destinationId.includes("freepawns") ||
      destinationId.includes("friday-droppable")
    ) {
      return false;
    }
  } else if (pawn.draggableId === "friday") {
    if (
      destinationId.includes("freepawns") ||
      destinationId.includes("dog-droppable")
    ) {
      return false;
    }
  } else {
    if (
      destinationId.includes("dog-droppable") ||
      destinationId.includes("friday-droppable")
    ) {
      return false;
    }
  }
  return true;
}
