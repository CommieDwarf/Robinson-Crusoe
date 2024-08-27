import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class LargeLeaves extends Token {
    constructor(game: IGame, id: string) {
        super(
            game,
            DISCOVERY_TOKEN.LARGE_LEAVES,
            "wielkie liście",
            "Odejmij jedną deszczową chmurę.",
            id
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        if (this._game.phaseService.phase === "weather") {
            if (this._game.weatherService.getOverallWeather().rain === 0) {
                this._game.alertService.setAlert("Nie ma żadnej deszczowej chmury.")
            } else {
                super.use(character);
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
