import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class TheHunt extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.THE_HUNT,
            "all",
            null,
            4,
            game,
            character
        );
    }

    use() {
        super.use(null);
        this._game.beastService.moveBeastFromStackToDeck();
    }

}
