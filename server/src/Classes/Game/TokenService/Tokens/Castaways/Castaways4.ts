import {Token} from "../Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class Castaways4 extends Token {
    constructor(game: IGame, id: string) {
        super(game, DISCOVERY_TOKEN.SCENARIO_4, "medalik z portretem damy", "Daje 3 żetony determinacji.", id);
    }

    use(character: ICharacter, target?: ICharacter) {

        super.use(character, target);
        this._game.characterService.incrDetermination(character, 3, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
