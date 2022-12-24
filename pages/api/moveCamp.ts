import { gameService } from "../../server/gameService";

export default function moveCamp(tileID: number) {
  gameService.game.tilesService.moveCamp(tileID);
}
