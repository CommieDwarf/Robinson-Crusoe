import {
  ActionDice,
  ActionDiceResult,
  ActionDiceResults,
  ActionDiceSide,
  ResultAxes,
  WeatherDice,
} from "../../../interfaces/RollDice/RollDice";
import { gather } from "../../../constants/diceStructures/gather";
import { build } from "../../../constants/diceStructures/build";
import { explore } from "../../../constants/diceStructures/explore";
import { weather } from "../../../constants/diceStructures/weather";
import { AdventureAction } from "../../../interfaces/ACTION";

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
    dice: ActionDice
  ): ActionDiceResult {
    const random = Math.floor(Math.random() * 6);
    const axes = this.getAxes(random);

    const result = diceStructures[action][dice][random];

    return {
      result,
      axes,
    };
  }

  public static getActionRollDiceResults(
    actionType: AdventureAction
  ): ActionDiceResults {
    return {
      success: this.getActionRollDiceResult(actionType, "success"),
      mystery: this.getActionRollDiceResult(actionType, "mystery"),
      hurt: this.getActionRollDiceResult(actionType, "hurt"),
    };
  }

  public static getWeatherRollDiceResult(dice: WeatherDice) {
    const random = Math.floor(Math.random() * 6);
    const axes = this.getAxes(random);

    const result = weather[dice][random];
    return {
      result,
      axes,
    };
  }
}
