import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class Vegetables extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.VEGETABLES,
            "jadalne kłącza",
            "jeśli masz zbudowane Naczynia, ulecz 2 rany w fazie nocy."
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null) {

        if (this._game.phaseService.phase === "night") {
            super.use(user);
            this._game.characterService.heal(user, 2, this._sourceLog);
            this._used = true;
        } else {
            this._game.alertService.setAlert("Tego żetonu można użyć tylko w nocy.");
        }
    }

    autoDiscard() {
    }
}
