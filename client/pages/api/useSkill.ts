import {gameService} from "../../../server/server/gameService";
import {ActionDice} from "../../../server/src/types/RollDice/RollDice";
import {Cloud} from "../../../server/src/types/Weather/Weather";
import {ICharacter} from "../../../server/src/types/Characters/Character";

export default function useSkill(
    skillName: string,
    characterName: string,
    target: ICharacter | ActionDice | Cloud | null,
) {
    const character =
        gameService.game.characterService.getCharacter(characterName);
    character.useSkill(skillName, target);
}
