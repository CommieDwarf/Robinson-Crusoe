import {gameService} from "../../../server/server/gameService";

export default function finishDrawingMysteryCards() {
    gameService.game.mysteryService.finish();
}
