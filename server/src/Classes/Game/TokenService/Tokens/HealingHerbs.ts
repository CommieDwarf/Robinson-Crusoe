import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class HealingHerbs extends Token {
    constructor(game: IGame, id: string) {
        super(
            game,
            DISCOVERY_TOKEN.HEALING_HERBS,
            "zioła",
            "jeśli zbudowałeś Naczynia, otrzymujesz +1 do morali",
            id
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        if (
            this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
        ) {
            super.use(character);
            this._game.moraleService.lvlUp(1, this._sourceLog);
            this._used = true;
        } else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.")
        }
    }

    autoDiscard() {
    }
}
