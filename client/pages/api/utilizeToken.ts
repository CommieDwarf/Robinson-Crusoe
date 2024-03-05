import {gameService} from "../../../server/server/gameService";

export default function utilizeToken(
    id: string,
    targetName: string | null = null
) {
    // Fixed to local player for the demo.
    gameService.game.tokenService.useToken(id, targetName);
}
