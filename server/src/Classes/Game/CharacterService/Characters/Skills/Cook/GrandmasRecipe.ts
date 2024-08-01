import {Ability} from "../Ability/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {CHARACTER} from "@shared/types/Game/Characters/Character";

export class GrandmasRecipe extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.GRANDMAS_RECIPE,
            "all",
            null,
            2,
            game,
            character
        );
    }

    use(target = null) {
        if (this._game.resourceService.canAffordResource("food", 1)) {
            const characters = this._game.characterService.allCharacters.filter((char) => char.name !== CHARACTER.DOG);
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            this._game.startPickingObject(characters,
                this._character as IPlayerCharacter,
                1,
                this._name,
                "character",
                (character) => {
                    this._game.characterService.heal(character, 2, this._name);
                })
            super.use(null);
        }
    }
}
