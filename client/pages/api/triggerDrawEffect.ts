import {gameService} from "../../../server/server/gameService";

export default function triggerDrawEffect() {
    gameService.game.mysteryService.triggerDrawEffect();
}
