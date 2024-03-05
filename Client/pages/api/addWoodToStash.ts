import {gameService} from "../../../Server/server/gameService";

export default function addWoodToStash() {
    gameService.game.scenarioService.addWood();
}
