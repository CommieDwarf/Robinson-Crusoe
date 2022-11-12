// @flow
import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import {AnimationWindow} from "./AnimationWindow";
import {RollActionDiceInfo} from "../../../../interfaces/RollDice/RollDice";
import {RollCubeService} from "../../../../server/Classes/RollCubeService/RollCubeService";

type Props = {};
export const RollDiceWindow = (props: Props) => {

    const rollDiceInfo: RollActionDiceInfo = {
        category: "gather",
        results: {
            hurt: RollCubeService.getRollDiceResult(),
            mystery: RollCubeService.getRollDiceResult(),
            success: RollCubeService.getRollDiceResult()
        }
    }


    return (
        <div className={styles.container}>
            <AnimationWindow rollDiceInfo={rollDiceInfo}/>
        </div>
    );
};
