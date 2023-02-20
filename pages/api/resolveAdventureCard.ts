import { gameService } from "../../server/gameService";

export default function resolveAdventureCard(option: 1 | 2) {
  gameService.game.adventureService.resolveAdventureCard(option);
}
