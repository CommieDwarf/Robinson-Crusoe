import {Token} from "../Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Castaways2 extends Token {
    constructor(game: IGame, id: string) {
        super(
            game,
            DISCOVERY_TOKEN.SCENARIO_2,
            "oliwa",
            "2 drewna tylko do odłożenia na stos.",
            id
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character, target)
        this._game.scenarioService.onItemUse(2, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
        return;
    }
}
