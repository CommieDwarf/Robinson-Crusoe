import { gameService } from "../../server/gameService";
import { Action } from "../../interfaces/Action";

export default function resolveActionItem(action: Action, droppableId: string) {
  gameService.game.actionService.resolveItem(action, droppableId);
}
