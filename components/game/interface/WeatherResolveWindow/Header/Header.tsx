// @flow
import * as React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import {RoundSquare} from "../../scenario/Scenario/Scenarios/Castaways/RoundSquare";

type Props = {
    round: number;
};
export const Header = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.symbol}>
                <Image src={"/interface/phase/weather.png"} fill alt={"pogoda"}
                       sizes={styles.symbol}
                />
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
            {/*<div className={styles.round}>*/}
            {/*  <div className={styles.roundText}>Runda:</div>*/}
            {/*  <div className={styles.roundSquare}>*/}
            {/*    <RoundSquare*/}
            {/*      round={props.round}*/}
            {/*      currentRound={true}*/}
            {/*      ship={false}*/}
            {/*      weather={{ rain: false, snow: false, hungryAnimal: false }}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
        </div>
    );
};
