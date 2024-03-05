import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {IGame} from "../../../../../../../interfaces/Game";
import {hooch} from "../../../../../../constants/SkillDescriptions/Cook";
import {PHASE} from "../../../../../../../interfaces/PhaseService/Phase";
import {ISkill} from "../../../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../../../interfaces/RollDice/RollDice";
import {Cloud} from "../../../../../../../interfaces/Weather/Weather";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class Hooch extends Skill implements ISkill<Cloud> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            hooch.name,
            hooch.namePL,
            hooch.description,
            hooch.quote,
            [PHASE.WEATHER],
            null,
            3,
            game,
            character
        );
    }

    use(target: Cloud) {
        if (target === "rain") {
            this._game.weatherService.incrementModifier(target, -1, this._namePL);
        } else {
            this._game.weatherService.incrementModifier(target, -1, this._namePL);
            this._game.weatherService.incrementModifier("rain", 1, this._namePL);
        }
        super.use(target);
    }

    canBeUsed(): boolean {
        const overallWeather = this._game.weatherService.getOverallWeather();
        return super.canBeUsed() && overallWeather.snow > 0 || overallWeather.rain > 0;
    }
}
