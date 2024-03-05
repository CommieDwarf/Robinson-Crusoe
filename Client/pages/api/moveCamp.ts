import {gameService} from "../../../Server/server/gameService";

export default function moveCamp(tileID: number) {
    gameService.game.tileService.moveCamp(tileID);
}
