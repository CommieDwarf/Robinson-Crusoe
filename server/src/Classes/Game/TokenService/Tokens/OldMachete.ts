import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class OldMachete extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.OLD_MACHETE, "stara maczeta", "Otrzymujesz +1 do broni");
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character);
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
