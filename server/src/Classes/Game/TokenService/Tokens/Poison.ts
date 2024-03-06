import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Poison extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.POISON,
            "trujące pędy",
            "Jeśli masz zbudowane Naczynia, otrzymujesz +2 do broni"
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        if (
            this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
        ) {
            super.use(user);
            this._game.constructionService.lvlUpConstruction(
                CONSTRUCTION.WEAPON,
                2,
                this._sourceLog
            );
            this._used = true;
        } else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.")
        }
    }

    autoDiscard() {
    }
}
