import {gameService} from "../../server/gameService";
import {CONSTRUCTION} from "../../interfaces/ConstructionService/Construction";

export default function switchCommittedResources(construction: CONSTRUCTION) {
    return gameService.game.constructionService.switchCommittedResources(construction);
}
