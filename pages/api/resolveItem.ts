import { game } from "../../server/game";
import { Action } from "../../interfaces/Action";

export default function resolveItem(action: Action, droppableId: string) {
  game.actionService.resolveItem(action, droppableId);
}
