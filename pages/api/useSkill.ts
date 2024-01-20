import {gameService} from "../../server/gameService";
import {ActionDice} from "../../interfaces/RollDice/RollDice";
import {IPlayerCharacter} from "../../interfaces/Characters/PlayerCharacter";
import {Cloud} from "../../interfaces/Weather/Weather";

export default function useSkill(
    skillName: string,
    characterName: string,
    target: IPlayerCharacter | ActionDice | Cloud | null = null,
) {
    const character =
        gameService.game.characterService.getCharacter(characterName);
    character.useSkill(skillName, target);
}
