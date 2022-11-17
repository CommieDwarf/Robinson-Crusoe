import {
  ActionDice,
  RollDiceResult,
} from "../../../interfaces/RollDice/RollDice";
import { ActionType } from "../../../interfaces/RollDice/RollDice";
import { gather } from "../../../constants/diceStructures/gather";
import { build } from "../../../constants/diceStructures/build";
import { explore } from "../../../constants/diceStructures/explore";

const diceStructures = {
  gather,
  build,
  explore,
};

export class RollDiceService {
  private static _resultsAxes = {
    r1: {
      y: 270,
      x: 360,
      z: 360,
    },
    r2: {
      y: 450,
      x: 360,
      z: 360,
    },
    r3: {
      y: 360,
      x: 450,
      z: 360,
    },
    r4: {
      y: 360,
      x: 270,
      z: 360,
    },
    r5: {
      y: 360,
      x: 360,
      z: 360,
    },
    r6: {
      y: 360,
      x: 180,
      z: 180,
    },
  };

  public static getRollDiceResult(actionType: ActionType, dice: ActionDice) {
    const random = Math.floor(Math.random() * 6) + 1;

    const axes =
      this._resultsAxes[("r" + random) as keyof typeof this._resultsAxes];
    axes.x *= 2;
    axes.y *= 2;
    axes.z *= 2;

    const result = diceStructures[actionType][dice][random];

    return {
      result,
      axes,
    } as RollDiceResult;
  }
}
