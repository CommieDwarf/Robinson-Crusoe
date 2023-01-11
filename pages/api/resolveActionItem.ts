import { gameService } from "../../server/gameService";
import { ACTION } from "../../interfaces/ACTION";

export default function resolveActionItem(itemID: string) {
  gameService.game.actionService.resolve(itemID);
}
