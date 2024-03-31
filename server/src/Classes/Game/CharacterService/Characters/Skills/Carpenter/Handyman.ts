import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";

export class Handyman extends Ability implements IAbility<any> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.HANDYMAN,
            "all",
            null,
            3,
            game,
            character);
    }

    use() {
        super.use(null);
        this._character.pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
    }
}
