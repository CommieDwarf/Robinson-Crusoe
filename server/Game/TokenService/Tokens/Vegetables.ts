import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayer} from "../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../interfaces/Characters/Character";
import {INVENTION_STARTER} from "../../../../interfaces/InventionService/Invention";

export class Vegetables extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.VEGETABLES,
            "jadalne kłącza",
            "jeśli masz zbudowane Naczynia, ulecz 2 rany w fazie nocy."
        );
    }

    use(user: IPlayer, target?: ICharacter) {

        if (this._game.phaseService.phase === "night") {
            super.use(user);
            if (this._game.inventionService.isBuilt(INVENTION_STARTER.POT)) {
                this._game.characterService.heal(user.getCharacter(), 2, this._sourceLog);
                this._used = true;
            }
        } else {
            this._game.alertService.setAlert("Tego żetonu można użyć tylko w nocy.");
        }
    }

    autoDiscard() {
    }
}
