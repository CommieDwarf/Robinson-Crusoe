import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Herbs extends Token {
    constructor(game: IGame, id: string) {
        super(
            game,
            DISCOVERY_TOKEN.HERBS,
            "przyprawy",
            "Jeśli zbudowałeś Naczynia, budujesz Lek bez poświęcania akcji",
            id
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        if (
            this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
        ) {
            super.use(character);
            this._used = true;
            this._game.inventionService.build(INVENTION_STARTER.MEDICINE, character);
        } else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.")
        }
    }

    autoDiscard() {
    }
}
