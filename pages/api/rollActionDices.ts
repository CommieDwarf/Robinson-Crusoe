import { gameService } from "../../server/gameService";

export default function rollActionDices(resolvableItemID: string) {
  gameService.game.actionService.rollDices(resolvableItemID);
}
