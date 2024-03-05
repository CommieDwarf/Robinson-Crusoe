import {Token} from "./Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class LargeLeaves extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.LARGE_LEAVES,
            "wielkie liście",
            "Odejmij jedną deszczową chmurę."
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        if (this._game.phaseService.phase === "weather") {
            if (this._game.weatherService.getOverallWeather().rain === 0) {
                this._game.alertService.setAlert("Nie ma żadnej deszczowej chmury.")
            } else {
                super.use(user);
                this._game.weatherService.incrementModifier("rain", -1, this._sourceLog);
                this._used = true;
            }

        } else {
            this._game.alertService.setAlert("Tego tokenu można użyć tylko w fazie pogody.")
        }
    }

    autoDiscard() {
    }
}
