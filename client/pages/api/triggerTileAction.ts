import {gameService} from "../../../server/server/gameService";

export default function triggerTileAction(
    tileID: number,
) {
    gameService.game.tileService.triggerMarkedTileAction(tileID);
}
