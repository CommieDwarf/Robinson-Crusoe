import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {INVENTION_STARTER} from "../../../types/InventionService/Invention";
import {DISCOVERY_TOKEN} from "../../../types/TokenService/Token";
import {IPlayer} from "../../../types/PlayerService/Player";
import {ICharacter} from "../../../types/Characters/Character";

export class HealingHerbs extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.HEALING_HERBS,
            "zioła",
            "jeśli zbudowałeś Naczynia, otrzymujesz +1 do morali"
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        if (
            this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
        ) {
            super.use(user);
            this._game.moraleService.lvlUp(1, this._sourceLog);
            this._used = true;
        } else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.")
        }
    }

    autoDiscard() {
    }
}
