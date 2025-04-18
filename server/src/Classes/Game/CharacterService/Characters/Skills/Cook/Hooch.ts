import {Ability} from "../Ability/Ability";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class Hooch extends Ability implements IAbility<Cloud> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.HOOCH,
            [PHASE.WEATHER],
            null,
            3,
            game,
            character
        );
    }

    use(target: Cloud) {
        if (!target) {
            throw new Error("this ability required target")
        }
        super.use(target);
        
        if (target === "rain") {
            this._game.weatherService.incrementModifier(target, -1, this._name);
        } else {
            this._game.weatherService.incrementModifier(target, -1, this._name);
            this._game.weatherService.incrementModifier("rain", 1, this._name);
        }

    }

    canBeUsed(): boolean {
        const overallWeather = this._game.weatherService.getOverallWeather();
        return super.canBeUsed() && overallWeather.snow > 0 || overallWeather.rain > 0;
    }
}
