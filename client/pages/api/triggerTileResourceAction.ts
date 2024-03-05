import {gameService} from "../../../server/server/gameService";

export default function triggerTileResourceAction(
    tileID: number,
    side: "left" | "right"
) {
    gameService.game.tileService.triggerMarkedTileResourceAction(tileID, side);
}
