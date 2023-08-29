import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export class FlaskOfRum extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.FLASK_OF_RUM, "Flaszka rumu", game);
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter = user) {
        if (!target) {
            throw Error("target is null");
        }
        if (this._game.phaseService.phase !== "night") {
            this._game.alertService.setAlert(
                "Tego przedmiotu można użyć tylko w nocy"
            );
        } else {
            super.use(user);
            this._game.characterService.heal(target, 1, this.namePL);
        }
    }
}
