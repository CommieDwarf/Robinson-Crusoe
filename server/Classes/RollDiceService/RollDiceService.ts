import {
  ActionDice,
  ActionDiceSide,
  DiceActionType,
  RollDiceResult,
  WeatherDice,
  WeatherDiceSide,
} from "../../../interfaces/RollDice/RollDice";
import { gather } from "../../../constants/diceStructures/gather";
import { build } from "../../../constants/diceStructures/build";
import { explore } from "../../../constants/diceStructures/explore";
import { weather } from "../../../constants/diceStructures/weather";

const diceStructures = {
  gather,
  build,
  explore,
  weather,
};

export class RollDiceService {
  public static resultsAxes = {
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
      RollDiceService.resultsAxes[
        ("r" + random) as keyof typeof this.resultsAxes
      ];
    const axisAdder = 360;
    axes.x += axisAdder;
    axes.y += axisAdder;
    axes.z += axisAdder;
    return axes;
  }

  public static getActionRollDiceResult(
    actionType: DiceActionType,
    dice: ActionDice
  ) {
    const random = Math.floor(Math.random() * 6);
    const axes = this.getAxes(random);

    const result = diceStructures[actionType][dice][random];
    return {
      result,
      axes,
    } as RollDiceResult<ActionDiceSide>;
  }

  public static getWeatherRollDiceResult<DiceSide>(dice: WeatherDice) {
    const random = Math.floor(Math.random() * 6);
    const axes = this.getAxes(random);

    const result = diceStructures.weather[dice][random] as unknown as DiceSide;
    return {
      result,
      axes,
    } as RollDiceResult<DiceSide>;
  }
}
