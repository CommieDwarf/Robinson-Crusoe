import {Token} from "../Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Castaways3 extends Token {
    constructor(game: IGame, id: string) {
        super(game, DISCOVERY_TOKEN.SCENARIO_3, "szabla pirata", "Daje +1 do broni ", id);
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character, target);
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
