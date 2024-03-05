import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {IGame} from "../../../../../../interfaces/Game";
import {stoneSoup} from "../../../../../../constants/SkillDescriptions/Cook";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {Cloud} from "../../../../../../interfaces/Weather/Weather";

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
