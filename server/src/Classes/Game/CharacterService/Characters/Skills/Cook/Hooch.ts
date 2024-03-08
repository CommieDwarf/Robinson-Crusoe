import {Ability} from "../Skill/Ability";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {hooch} from "@shared/constants/SkillDescriptions/Cook";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class Hooch extends Ability implements IAbility<Cloud> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.HOOCH,
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
