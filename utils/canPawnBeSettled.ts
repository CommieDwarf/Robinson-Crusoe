import { IPawn } from "../interfaces/Pawns/Pawn";

export function getPawnCanBeSettled(
  pawn: IPawn | null,
  destinationId: string
): boolean {
  if (!pawn) {
    return true;
  }
  console.log(destinationId);
  if (pawn.draggableId.includes("dog")) {
    if (destinationId.includes("leader")) {
      return false;
    }
    if (destinationId.includes("hunt") || destinationId.includes("explore")) {
      return true;
    }
    return destinationId.includes("freepawns-dog");
  } else if (pawn.draggableId === "friday") {
    return !(
      destinationId.includes("freepawns") &&
      !destinationId.includes("freepawns-friday")
    );
  } else {
    return !(
      destinationId.includes("freepawns") &&
      !destinationId.includes(pawn.character.name)
    );
  }
}
