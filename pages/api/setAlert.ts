import {gameService} from "../../server/gameService";

export default function setAlert(msg: string) {
    gameService.game.alertService.setAlert(msg);
}
