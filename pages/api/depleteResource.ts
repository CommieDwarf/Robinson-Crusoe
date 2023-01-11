import { gameService } from "../../server/gameService";

export default function depleteResource(
  tileID: number,
  side: "left" | "right"
) {
  gameService.game.tileService.depleteResource(tileID, side);
}
