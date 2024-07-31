import {Ability} from "../Ability/Ability";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ACTION} from "@shared/types/Game/ACTION";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class Scrounger extends Ability implements IAbility<ActionDice> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.SCROUNGER,
            [PHASE.ACTION],
            ACTION.GATHER,
            2,
            game,
            character
        );
    }

    use(target: ActionDice) {
        if (!target) {
            throw new Error("this error requires target")
        }
        if (this._game.actionService.action !== ACTION.GATHER) {
            this._game.alertService.setAlert(
                "Tej umiejętności można użyć tylko na kostkach zbierania"
            );
        }

        if (this._game.actionService.lastRolledItem) {
            super.use(target);
            this._game.actionService.reRollDice(target);
        }
    }
}
