// @flow
import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { AnimationWindow } from "./AnimationWindow";
import { RollCubeService } from "../../../../server/Classes/RollCubeService/RollCubeService";
import Image from "next/image";
import { ActionRollDiceInfo } from "../../../../interfaces/RollDice/RollDice";

const dupa = {
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

type Props = {};
export const RollDiceWindow = (props: Props) => {
  const rollDiceInfo: ActionRollDiceInfo = {
    type: "build",
    results: {
      hurt: RollCubeService.getRollDiceResult(),
      mystery: RollCubeService.getRollDiceResult(),
      success: RollCubeService.getRollDiceResult(),
    },
  };

  rollDiceInfo.results.success.axes = dupa.r4;
  rollDiceInfo.results.mystery.axes = dupa.r2;
  rollDiceInfo.results.hurt.axes = dupa.r6;

  return (
    <div className={styles.container}>
      <AnimationWindow rollDiceInfo={rollDiceInfo} />
    </div>
  );
};
