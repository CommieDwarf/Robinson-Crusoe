import {Token} from "./Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

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
