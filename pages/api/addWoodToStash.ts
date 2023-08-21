import {gameService} from "../../server/gameService";

export default function addWoodToStash() {
    gameService.game.scenarioService.addWood();
}
