import {gameService} from "../../../server/server/gameService";
import {ITEM} from "../../../server/src/types/Equipment/Item";

export default function utilizeItem(item: ITEM) {
    gameService.game.equipmentService.useItem(item)
}
