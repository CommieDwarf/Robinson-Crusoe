import {gameService} from "../../server/gameService";

export default function utilizeInvention(name: string) {
    gameService.game.inventionService.useInvention(name);
}
