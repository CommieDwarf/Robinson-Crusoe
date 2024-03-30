import {Ability} from "../Skill/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ACTION} from "@shared/types/Game/ACTION";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";


export class Reconnaissance extends Ability {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.RECONNAISSANCE, "description", "quote", "all", null, 2, game, character);
    }


    use(target: any) {
        const tileTypes = this._game.tileService.pickTileTypesFromStack(3);
        this._game.startPickingObject(tileTypes, this._character as IPlayerCharacter, 1, this._name, "tileType", (tileType) => {
            this._game.tileService.switchOrderInTileStack(tileType, "top");
        })
        super.use(target);
    }
}
