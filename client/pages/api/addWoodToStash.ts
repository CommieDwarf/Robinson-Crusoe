import {gameService} from "../../../server/server/gameService";

export default function addWoodToStash() {
    gameService.game.scenarioService.addWood();
}
