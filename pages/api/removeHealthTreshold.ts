import {gameService} from "../../server/gameService";

export default function removeHealthThreshold(num: number) {
    //TODO: change hardcoded Character;
    gameService.game.characterService.removeMoraleThreshold("cook", num)
}
