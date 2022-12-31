import {
  IPawnHelperRenderData,
  IPawnRenderData,
} from "../interfaces/Pawns/Pawn";

export function getPawnCanBeSettled(
  pawn: null | IPawnRenderData | IPawnHelperRenderData,
  destinationId: string
): boolean {
  if (!pawn) {
    return true;
  }
  if ("action" in pawn) {
    switch (pawn.action) {
      case "build":
        return (
          destinationId.includes("invention") ||
          destinationId.includes("structure")
        );
      case "explore":
        return destinationId.includes("explore");
      case "gather":
        return destinationId.includes("gather");
    }
  }

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
