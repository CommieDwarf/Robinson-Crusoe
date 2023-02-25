import { gameService } from "../../server/gameService";

export default function drawMysteryCard() {
  gameService.game.mysteryService.drawCard();
}
