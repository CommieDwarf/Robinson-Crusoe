import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class FlaskOfRum extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.FLASK_OF_RUM, "Flaszka rumu", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        if (this._game.phaseService.phase !== "night") {
            this._game.alertService.setAlert(
                "Tego przedmiotu można użyć tylko w nocy"
            );
        } else {
            super.use(user);
            this._game.characterService.heal(user.getCharacter(), 1, this.namePL);
        }
    }
}
