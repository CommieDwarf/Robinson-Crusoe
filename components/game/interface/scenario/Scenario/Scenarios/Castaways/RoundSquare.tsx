// @flow
import * as React from "react";
import styles from "./RoundSquare.module.css";
import Image from "next/image";

interface Props {
    round: number;
    currentRound: boolean;
    ship: boolean;
    weather: {
        rain: boolean;
        snow: boolean;
        hungryAnimal: boolean;
    };
}

export function RoundSquare(props: Props) {
    const weatherPositions = ["weatherTop", "weatherRight", "weatherLeft"];

    const weatherEffects = Object.entries(props.weather).map(([key, value]) => {
        if (value) {
            const position = weatherPositions.pop();
            if (!position) {
                return;
            }


            return (
                <div
                    className={
                        styles.weather + " " + styles[key] + " " + styles[position]
                    }
                >
                    <Image
                        src={`/interface/scenarios/${key}.png`}
                        layout={"fill"}
                        alt={"pogoda"}
                    />
                </div>
            );
        }
    });

    const currentRoundClass = props.currentRound ? styles.currentRound : "";

    const picture = props.currentRound ? "current" : props.round;
    return (
        <div className={styles.container}>
            {weatherEffects}
            <Image
                src={"/interface/scenarios/squares/" + picture + ".png"}
                className={styles.square}
                layout={"fill"}
                alt={"runda"}
            />
            <div className={styles.round + " " + currentRoundClass}>
                {props.round}

            </div>
            {props.ship && (
                <div className={styles.boat}>
                    <Image
                        src={"/interface/scenarios/boat.png"}
                        alt="Łódź"
                        layout={"fill"}
                    />
                </div>
            )}

        </div>
    );
}
