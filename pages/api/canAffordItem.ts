import {gameService} from "../../server/gameService";

export default function canAffordItem(droppableId: string) {
    return gameService.game.canCommitResources(droppableId)
}
