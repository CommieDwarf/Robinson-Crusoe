import {Item} from "../Item";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

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
