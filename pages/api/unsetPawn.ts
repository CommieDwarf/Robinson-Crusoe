import { gameService } from "../../server/gameService";

export default function unsetPawn(destinationId: string, draggableId: string) {
  gameService.game.unsetPawn(destinationId, draggableId);
}
