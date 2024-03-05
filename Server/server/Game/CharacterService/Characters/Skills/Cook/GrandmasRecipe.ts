import {Skill} from "../Skill/Skill";
import {IGame} from "../../../../../../../interfaces/Game";
import {grandmasRecipe} from "../../../../../../constants/SkillDescriptions/Cook";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ISkill} from "../../../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../../../interfaces/RollDice/RollDice";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";
import {Cloud} from "../../../../../../../interfaces/Weather/Weather";

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
