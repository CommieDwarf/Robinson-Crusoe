import { gameService } from "../../server/gameService";

export default function triggerDrawEffect() {
  gameService.game.mysteryService.triggerDrawEffect();
}
