import {gameService} from "../../../Server/server/gameService";

export default function drawMysteryCard() {
    gameService.game.mysteryService.drawCard();
}
