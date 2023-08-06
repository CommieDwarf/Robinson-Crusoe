import { gameService } from "../../server/gameService";
import { ActionDice } from "../../interfaces/RollDice/RollDice";
import { IPlayerCharacter } from "../../interfaces/Characters/Character";

export default function useSkill(
  skillName: string,
  characterName: string,
  target: IPlayerCharacter | ActionDice | null
) {
  const character =
    gameService.game.characterService.getCharacter(characterName);
  character.useSkill(skillName, target);
}
