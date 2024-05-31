import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";

export class Vegetables extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.VEGETABLES,
            "jadalne kłącza",
            "jeśli masz zbudowane Naczynia, ulecz 2 rany w fazie nocy."
        );
    }

    use(character: ICharacter, target?: ICharacter) {

        if (this._game.phaseService.phase === "night") {
            super.use(character);
            if (this._game.inventionService.isBuilt(INVENTION_STARTER.POT)) {
                this._game.characterService.heal(character, 2, this._sourceLog);
                this._used = true;
            }
        } else {
            this._game.alertService.setAlert("Tego żetonu można użyć tylko w nocy.");
        }
    }

    autoDiscard() {
    }
}
