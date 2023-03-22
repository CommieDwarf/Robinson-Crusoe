import {gameService} from "../../server/gameService";

export default function triggerTileAction(
    tileID: number,
) {
    gameService.game.tileService.getTile(tileID).triggerAction();
}
