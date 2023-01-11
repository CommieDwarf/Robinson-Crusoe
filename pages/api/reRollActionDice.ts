import { gameService } from "../../server/gameService";

export default function reRollActionDice(resolvableItemID: string) {
  gameService.game.actionService.reRollSuccess(resolvableItemID);
}
