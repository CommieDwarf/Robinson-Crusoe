import {gameService} from "../../../server/server/gameService";

export default function moveCamp(tileID: number) {
    gameService.game.tileService.moveCamp(tileID);
}
