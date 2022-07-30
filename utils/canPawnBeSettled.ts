import { IPawn } from "../interfaces/Pawn";

export default function getPawnCanBeSettled(
  pawn: IPawn,
  destinationId: string
): boolean {
  if (pawn.id == "dog") {
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
  } else if (pawn.id === "friday") {
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
