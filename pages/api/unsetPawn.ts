import { gameService } from "../../server/gameService";

export interface UnsetPawnData {
  destinationId: string;
  draggableId: string;
}

export default function unsetPawn(destinationId: string, draggableId: string) {
  gameService.game.unsetPawn(destinationId, draggableId);
}
