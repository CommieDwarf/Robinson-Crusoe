import { game } from "../../server/game";

export default function applyTokenApi(id: string) {
  // Fixed to local player for the demo.
  game.localPlayer.getCharacter().tokenService.useToken(id);
}
