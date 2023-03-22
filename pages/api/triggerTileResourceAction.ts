import {gameService} from "../../server/gameService";

export default function triggerTileResourceAction(
    tileID: number,
    side: "left" | "right"
) {
    gameService.game.tileService.getTile(tileID).triggerResourceAction(side, "");
}
