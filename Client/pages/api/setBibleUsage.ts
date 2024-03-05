import {gameService} from "../../../Server/server/gameService";

export default function setBibleUsage(resolvableItemId: string, value: boolean) {
    gameService.game.actionService.setBibleUsage(resolvableItemId, value);
}
