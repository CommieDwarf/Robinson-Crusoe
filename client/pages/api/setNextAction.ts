import {gameService} from "../../../server/server/gameService";

export function setNextAction() {
    gameService.game.actionService.setNextAction();
}
