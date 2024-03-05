import {gameService} from "../../../Server/server/gameService";
import {ITEM} from "../../../interfaces/Equipment/Item";

export default function utilizeItem(item: ITEM) {
    gameService.game.equipmentService.useItem(item)
}
