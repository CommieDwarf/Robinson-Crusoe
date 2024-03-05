import {gameService} from "../../../server/server/gameService";
import {CONSTRUCTION} from "../../../server/src/types/ConstructionService/Construction";

export default function switchCommittedResources(construction: CONSTRUCTION) {
    return gameService.game.constructionService.switchCommittedResources(construction);
}
