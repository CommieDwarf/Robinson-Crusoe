import {gameService} from "../../../Server/server/gameService";

export default function finishDrawingMysteryCards() {
    gameService.game.mysteryService.finish();
}
