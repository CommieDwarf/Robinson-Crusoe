import { gameService } from "../../server/gameService";

export default function utilizeToken(id: string) {
  // Fixed to local player for the demo.
  gameService.game.localPlayer.getCharacter().tokenService.useToken(id);
}
