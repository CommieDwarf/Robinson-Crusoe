import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {CONSTRUCTION} from "../../../types/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "../../../types/TokenService/Token";
import {IPlayer} from "../../../types/PlayerService/Player";
import {ICharacter} from "../../../types/Characters/Character";

export class ThornyBushes extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.THORNY_BUSHES,
            "cierniste krzewy",
            "Jeśli schronienie jest zbudowane, otrzymujesz +1 do palisady."
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        if (
            this._game.constructionService.getConstruction(CONSTRUCTION.SHELTER).lvl >
            0
        ) {
            super.use(user);
            this._game.constructionService.lvlUpConstruction(
                CONSTRUCTION.PALISADE,
                1,
                this._sourceLog
            );
            this._used = true;
        }
    }

    autoDiscard() {
    }
}
