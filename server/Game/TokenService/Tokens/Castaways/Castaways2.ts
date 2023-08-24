import {Token} from "../Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export class Castaways2 extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.SCENARIO_2,
            "oliwa",
            "2 drewna tylko do odłożenia na stos."
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null) {
        super.use(user)
        this._game.scenarioService.onItemUse(2, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
        return;
    }
}
