import {
  ActionDice,
  DiceActionType,
  RollDiceResult,
} from "../../../interfaces/RollDice/RollDice";
import { gather } from "../../../constants/diceStructures/gather";
import { build } from "../../../constants/diceStructures/build";
import { explore } from "../../../constants/diceStructures/explore";

const diceStructures = {
  gather,
  build,
  explore,
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
      z: 270,
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

  public static getRollDiceResult(
    actionType: DiceActionType,
    dice: ActionDice
  ) {
    const random = Math.floor(Math.random() * 6);
    const axes =
      RollDiceService.resultsAxes[
        ("r" + random) as keyof typeof this.resultsAxes
      ];

    const result = diceStructures[actionType][dice][random];
    return {
      result,
      axes,
    } as RollDiceResult;
  }
}
