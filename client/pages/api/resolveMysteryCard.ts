import {gameService} from "../../../server/server/gameService";

export default function resolveEventMystery() {
    gameService.game.eventService.resolveEventMystery();
}
