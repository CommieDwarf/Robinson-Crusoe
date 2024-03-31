import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ACTION} from "@shared/types/Game/ACTION";

export class ANewIdea extends Ability implements IAbility<any> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.A_NEW_IDEA,
            "all",
            null,
            3,
            game,
            character);
    }

    use() {
        super.use(null);
        const inventions = this._game.inventionService.pickInventionsFromStack(5);
        this._game.startPickingObject(inventions, this._character as IPlayerCharacter, 1, this._name, "invention", (invention) => {
            this._game.inventionService.addInvention(invention);
            this._game.inventionService.shuffleInventionStack();
        })
    }
}
