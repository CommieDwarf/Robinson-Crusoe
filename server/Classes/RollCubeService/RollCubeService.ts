import { RollDiceResult } from "../../../interfaces/RollDice/RollDice";

type Key = "r1" | "r2" | "r3" | "r4" | "r5" | "r6";

export class RollCubeService {
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

  public static getRollDiceResult() {
    const random = Math.floor(Math.random() * 6) + 1;

    const axes = this._resultsAxes[("r" + random) as Key];
    axes.x *= 2;
    axes.y *= 2;
    axes.z *= 2;

    return {
      result: random,
      axes,
    } as RollDiceResult;
  }
}
