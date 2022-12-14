import { gameService } from "../../server/gameService";

export interface SetPawnData {
  destinationId: string;
  draggableId: string;
}

export default function setPawn(destinationId: string, draggableId: string) {
  gameService.game.setPawn(destinationId, draggableId);
}
