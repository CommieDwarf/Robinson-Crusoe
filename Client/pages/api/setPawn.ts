import {gameService} from "../../../Server/server/gameService";

export default function setPawn(destinationId: string, draggableId: string) {
    gameService.game.setPawn(destinationId, draggableId);
}
