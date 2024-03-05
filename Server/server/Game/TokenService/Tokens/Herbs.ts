import {Token} from "./Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class Herbs extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.HERBS,
            "przyprawy",
            "Jeśli zbudowałeś Naczynia, budujesz Lek bez poświęcania akcji"
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        if (
            this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
        ) {
            super.use(user);
            this._used = true;
            this._game.inventionService.build(INVENTION_STARTER.MEDICINE, user.getCharacter());
        } else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.")
        }
    }

    autoDiscard() {
    }
}
