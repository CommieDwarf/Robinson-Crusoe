import {gameService} from "../../../Server/server/gameService";

export default function resolveEventAdventure(
    option: 1 | 2
) {
    gameService.game.eventService.resolveEventAdventure(option);
}
