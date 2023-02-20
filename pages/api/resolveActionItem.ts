import { gameService } from "../../server/gameService";

export default function resolveActionItem(itemID: string) {
  gameService.game.actionService.resolve(itemID);
}
