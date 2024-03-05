import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {CONSTRUCTION} from "../../../types/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "../../../types/TokenService/Token";
import {IPlayer} from "../../../types/PlayerService/Player";
import {ICharacter} from "../../../types/Characters/Character";

export class OldMachete extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.OLD_MACHETE, "stara maczeta", "Otrzymujesz +1 do broni");
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this._sourceLog
        );
        this._used = true;
    }

    autoDiscard() {
    }
}
