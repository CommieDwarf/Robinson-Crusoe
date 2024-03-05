import {Token} from "../Token/Token";
import {IGame} from "../../../../types/Game";
import {DISCOVERY_TOKEN} from "../../../../types/TokenService/Token";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class Castaways3 extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.SCENARIO_3, "szabla pirata", "Daje +1 do broni ");
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user, target);
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this._sourceLog
        );
        this._used = true;
    }

    autoDiscard() {
        return;
    }
}
