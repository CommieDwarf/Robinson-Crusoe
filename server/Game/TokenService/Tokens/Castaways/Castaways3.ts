import {Token} from "../Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export class Castaways3 extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.SCENARIO_3, "szabla pirata", "Daje +1 do broni ");
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
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
