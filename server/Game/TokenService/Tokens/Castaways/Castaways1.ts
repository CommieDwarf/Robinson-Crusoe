import {Token} from "../Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class Castaways1 extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.SCENARIO_1, "zioła", "Leczy 1 ranę w nocy.");
    }

    use(user: IPlayer, target?: ICharacter) {
        if (!target) {
            throw new Error("No target specified");
        }
        if (this._game.phaseService.phase === "night") {
            super.use(user, target);
            this._game.characterService.heal(target, 1, this._sourceLog);
            this._used = true;
        } else {
            this._game.alertService.setAlert(
                `Tego żetonu można użyć tylko w nocy.`
            );
        }
    }

    autoDiscard() {
        return;
    }
}
