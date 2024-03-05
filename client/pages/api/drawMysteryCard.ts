import {gameService} from "../../../server/server/gameService";

export default function drawMysteryCard() {
    gameService.game.mysteryService.drawCard();
}
