import { game } from "../../server/game";

export function setNextAction() {
  game.actionService.setNextAction();
}
