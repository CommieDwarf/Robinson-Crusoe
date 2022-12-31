import { gameService } from "../../server/gameService";

export default function utilizeToken(
  userName: string,
  id: string,
  targetName: string | null = null
) {
  // Fixed to local player for the demo.
  gameService.game.tokenService.useToken(userName, id, targetName);
}
