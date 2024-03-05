import {gameService} from "../../../Server/server/gameService";

export default function resolveEventMystery() {
    gameService.game.eventService.resolveEventMystery();
}
