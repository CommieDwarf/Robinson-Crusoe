import {gameService} from "../../../Server/server/gameService";

export default function triggerDrawEffect() {
    gameService.game.mysteryService.triggerDrawEffect();
}
