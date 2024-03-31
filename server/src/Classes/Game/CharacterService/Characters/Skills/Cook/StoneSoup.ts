import {Ability} from "../Ability/Ability";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class StoneSoup extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.STONE_SOUP,
            "all",
            null,
            3,
            game,
            character
        );
    }

    use() {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourceToFuture(
                "food",
                1,
                this._name
            );
        } else {
            this._game.resourceService.addBasicResourceToOwned(
                "food",
                1,
                this._name
            );
        }
        super.use(null);
    }
}
