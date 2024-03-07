// @flow
import * as React from "react";
import styles from "./Header.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";

import weatherImg from "/public/UI/phase/weather.png";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import nightImg from "/public/UI/phase/night.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {emitAction} from "../../../../../pages/api/emitAction";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

type Props = {
    round: number;
    resolved: boolean;
};
export const Header = (props: Props) => {
    function handleClick() {
        emitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE);
    }

    return (
        <div className={styles.container}>
            <div className={styles.symbol}>
                <ResizableImage src={weatherImg} alt={"pogoda"}/>
            </div>
            <span className={styles.title}>Faza Pogody</span>
            <div className={styles.symbol + " " + styles.round}>
                <RoundSquare
                    round={12}
                    currentRound={true}
                    ship={false}
                    weather={{rain: false, snow: false, hungryAnimal: false}}
                />
            </div>
            {props.resolved && (
                <div className={styles.nextPhaseButton} onClick={handleClick}>
                    <div className={styles.arrow}>
                        <ResizableImage
                            src={redArrowImg}
                            alt={"strzałka"}
                            fill
                            sizes={styles.arrow}
                        />
                    </div>
                    <div className={styles.night}>
                        <ResizableImage
                            src={nightImg}
                            alt={"następna faza"}
                            fill
                            sizes={styles.night}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
