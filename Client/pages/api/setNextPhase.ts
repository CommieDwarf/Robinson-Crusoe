import {gameService} from "../../../Server/server/gameService";

export default function setNextPhase() {
    gameService.game.phaseService.goNextPhase();
}
