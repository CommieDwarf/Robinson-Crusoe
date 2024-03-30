import {Ability} from "../Skill/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {grandmasRecipe} from "@shared/constants/SkillDescriptions/Cook";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class GrandmasRecipe extends Ability implements IAbility<ICharacter> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.GRANDMAS_RECIPE,
            grandmasRecipe.description,
            grandmasRecipe.quote,
            "all",
            null,
            2,
            game,
            character
        );
    }

    use(target: ICharacter) {
        if (this._game.resourceService.canAffordResource("food", 1)) {
            this._game.characterService.heal(target, 2, this._name);
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            super.use(target);
        } else {
            this._game.alertService.setAlert(
                "Niewystarczająco jedzenia aby użyć tej umiejętności"
            );
        }
    }
}
