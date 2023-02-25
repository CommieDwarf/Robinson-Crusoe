import { gameService } from "../../server/gameService";

export default function finishDrawingMysteryCards() {
  gameService.game.mysteryService.finish();
}
