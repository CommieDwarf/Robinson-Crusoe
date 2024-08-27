import {Token} from "../Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Castaways1 extends Token {
    constructor(game: IGame, id: string) {
        super(game, DISCOVERY_TOKEN.SCENARIO_1, "zioła", "Leczy 1 ranę w nocy.", id);
    }

    use(character: ICharacter, target?: ICharacter) {
        if (!target) {
            throw new Error("No target specified");
        }
        if (this._game.phaseService.phase === "night") {
            super.use(character, target);
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
