import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {stoneSoup} from "@shared/constants/SkillDescriptions/Cook";

export class StoneSoup extends Skill implements ISkill<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            stoneSoup.name,
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
