import {gameService} from "../../../Server/server/gameService";

export function setNextAction() {
    gameService.game.actionService.setNextAction();
}
