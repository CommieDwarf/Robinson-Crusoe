import {Ability} from "../Ability/Ability";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ACTION} from "@shared/types/Game/ACTION";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";

export class Lucky extends Ability {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.LUCKY, "description", "quote", [PHASE.ACTION], ACTION.EXPLORE, 2, game, character);
    }


    use(target: ActionDice) {
        if (this._game.actionService.action !== ACTION.EXPLORE) {
            return;
        }

        if (this._game.actionService.lastRolledItem) {
            this._game.actionService.lastRolledItem.reRollDice(target, ACTION.EXPLORE);
            super.use(target);
        }
    }
}
