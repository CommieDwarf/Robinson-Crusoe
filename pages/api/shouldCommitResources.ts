import {gameService} from "../../server/gameService";

export default function shouldCommitResources(droppableId: string) {
    return gameService.game.shouldCommitResources(droppableId);
}
