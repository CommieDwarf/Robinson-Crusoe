import {Skill} from "../Skill/Skill";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {grandmasRecipe} from "@shared/constants/SkillDescriptions/Cook";

export class GrandmasRecipe extends Skill implements ISkill<ICharacter> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            grandmasRecipe.name,
            grandmasRecipe.namePL,
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
            this._game.characterService.heal(target, 2, this._namePL);
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            super.use(target);
        } else {
            this._game.alertService.setAlert(
                "Niewystarczająco jedzenia aby użyć tej umiejętności"
            );
        }
    }
}
