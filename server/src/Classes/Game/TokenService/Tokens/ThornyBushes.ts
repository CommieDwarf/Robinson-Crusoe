import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

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
