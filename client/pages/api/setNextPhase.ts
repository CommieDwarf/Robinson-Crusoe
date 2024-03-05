import {gameService} from "../../../server/server/gameService";

export default function setNextPhase() {
    gameService.game.phaseService.goNextPhase();
}
