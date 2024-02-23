// @flow
import * as React from "react";
import styles from "../Castaways.module.css";
import {castaways} from "../../../../../../../constants/scenarios/castaways";
import {RoundSquare} from "./RoundSquare";

type Props = {
    current: number;
};
const Rounds = (props: Props) => {
    const rounds = [];

    for (let i = 1; i <= 12; i++) {
        const ship = i >= 10;
        const weather = {
            rain: castaways.weather.rain.includes(i),
            snow: castaways.weather.winter.includes(i),
            hungryAnimal: castaways.weather.animals.includes(i),
        };
        const current = i === props.current;
        rounds.push(
            <RoundSquare
                round={i}
                ship={ship}
                weather={weather}
                currentRound={current}
                key={i}
            />
        );
    }

    return <div className={styles.rounds}>{rounds}</div>;
};

export default React.memo(Rounds);
