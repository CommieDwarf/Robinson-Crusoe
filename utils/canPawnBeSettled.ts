import { IPawn, IPawnRenderData } from "../interfaces/Pawns/Pawn";
import { ICharacter } from "../interfaces/Characters/Character";
import { characters } from "../server/Classes/Game";

export function getPawnCanBeSettled(
  pawn: null | IPawnRenderData,
  destinationId: string
): boolean {
  if (!pawn) {
    return true;
  }

  const char = characters.find((ch: ICharacter) => ch.id === pawn.characterId);
  if (!char) {
    throw new Error("Can't find character with id: " + pawn.characterId);
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
      destinationId.includes("freepawns") && !destinationId.includes(char.name)
    );
  }
}
