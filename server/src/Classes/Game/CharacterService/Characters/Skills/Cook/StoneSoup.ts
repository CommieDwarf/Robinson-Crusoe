import {Ability} from "../Skill/Ability";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {stoneSoup} from "@shared/constants/SkillDescriptions/Cook";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class StoneSoup extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.STONE_SOUP,
            stoneSoup.namePL,
            stoneSoup.description,
            stoneSoup.quote,
            "all",
            null,
            3,
            game,
            character
        );
    }

    use(target: null) {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourceToFuture(
                "food",
                1,
                this._namePL
            );
        } else {
            this._game.resourceService.addBasicResourceToOwned(
                "food",
                1,
                this._namePL
            );
        }
        super.use(target);
    }
}
