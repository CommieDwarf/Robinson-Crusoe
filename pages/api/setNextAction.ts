import { gameService } from "../../server/gameService";

export function setNextAction() {
  gameService.game.actionService.setNextAction();
}
