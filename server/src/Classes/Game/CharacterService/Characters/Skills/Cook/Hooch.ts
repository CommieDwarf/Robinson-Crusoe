import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {hooch} from "@shared/constants/SkillDescriptions/Cook";

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
