import {
    ActionDice,
    ActionDiceResult,
    ActionDiceResults,
    ActionDiceSide,
    ResultAxes,
    WeatherDice,
} from "@shared/types/Game/RollDice/RollDice";
import {gather} from "@shared/constants/diceStructures/gather";
import {build} from "@shared/constants/diceStructures/build";
import {explore} from "@shared/constants/diceStructures/explore";
import {weather} from "@shared/constants/diceStructures/weather";
import {AdventureAction} from "@shared/types/Game/ACTION";

const diceStructures: ActionDiceStructures = {
    gather,
    build,
    explore,
};

export type ActionDiceStructures = {
    [key in AdventureAction]: {
        hurt: ActionDiceSide[];
        mystery: ActionDiceSide[];
        success: ActionDiceSide[];
    };
};

export class RollDiceService {
    public static resultsAxes: ResultAxes = {
        r0: {
            y: 270,
            x: 360,
            z: 360,
        },
        r1: {
            y: 450,
            x: 360,
            z: 360,
        },
        r2: {
            y: 360,
            x: 450,
            z: 360,
        },
        r3: {
            y: 360,
            x: 270,
            z: 360,
        },
        r4: {
            y: 360,
            x: 360,
            z: 360,
        },
        r5: {
            y: 360,
            x: 180,
            z: 180,
        },
    };

    private static getAxes(random: number) {
        const axes =
            RollDiceService.resultsAxes[("r" + random) as keyof ResultAxes];
        const axisIncr = 360;
        axes.x += axisIncr;
        axes.y += axisIncr;
        axes.z += axisIncr;
        return axes;
    }

    public static getActionRollDiceResult(
        action: AdventureAction,
        dice: ActionDice,
        rngFunc: () => number
    ): ActionDiceResult {
        const random = Math.floor(rngFunc() * 6);
        const axes = this.getAxes(random);

        const result = diceStructures[action][dice][random];

        return {
            result,
            axes,
        };
    }

    public static getActionRollDiceResults(
        actionType: AdventureAction,
        rngFunc: () => number,
    ): ActionDiceResults {
        return {
            success: this.getActionRollDiceResult(actionType, "success", rngFunc),
            mystery: this.getActionRollDiceResult(actionType, "mystery", rngFunc),
            hurt: this.getActionRollDiceResult(actionType, "hurt", rngFunc),
        };
    }

    public static getWeatherRollDiceResult(dice: WeatherDice, rngFunc: () => number) {
        const random = Math.floor(rngFunc() * 6);
        const axes = this.getAxes(random);

        const result = weather[dice][random];
        return {
            result,
            axes,
        };
    }
}
