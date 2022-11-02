import { Action } from "../../interfaces/Action";
import { game } from "../../server/game";

export default function getResolvingActions(action: Action) {
  return game.actionService.renderData;
}
