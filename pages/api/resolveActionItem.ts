import { gameService } from "../../server/gameService";
import { ACTION } from "../../interfaces/ACTION";

export default function resolveActionItem(action: ACTION, droppableId: string) {
  gameService.game.actionService.resolveItem(action, droppableId);
}
