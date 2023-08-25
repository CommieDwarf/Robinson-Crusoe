import { gameService } from "../../server/gameService";

export default function removeHealthThreshold(num: number) {
    //TODO: change hardcoded character;
  gameService.game.characterService.removeMoraleThreshold("cook", num)
}
