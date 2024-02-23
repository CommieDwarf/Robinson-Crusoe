// @flow
import * as React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";

import weatherImg from "/public/UI/phase/weather.png";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import nightImg from "/public/UI/phase/night.png";

type Props = {
    round: number;
    setNextPhase: () => void;
    resolved: boolean;
};
export const Header = (props: Props) => {
    function handleClick() {
        props.setNextPhase();
    }

    return (
        <div className={styles.container}>
            <div className={styles.symbol}>
                <Image src={weatherImg} fill alt={"pogoda"} sizes={styles.symbol}/>
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
                        <Image
                            src={redArrowImg}
                            alt={"strzałka"}
                            fill
                            sizes={styles.arrow}
                        />
                    </div>
                    <div className={styles.night}>
                        <Image
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
