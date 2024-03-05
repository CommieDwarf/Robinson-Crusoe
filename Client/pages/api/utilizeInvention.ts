import {gameService} from "../../../Server/server/gameService";

export default function utilizeInvention(name: string) {
    gameService.game.inventionService.useInvention(name);
}
