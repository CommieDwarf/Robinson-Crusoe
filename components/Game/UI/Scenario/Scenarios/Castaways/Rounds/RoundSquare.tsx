// @flow
import * as React from "react";
import styles from "./RoundSquare.module.css";
import Image from "next/image";
import logStyles from "../../../../ChatLog/LogMessage/LogMessage.module.css";

interface Props {
    round: number;
    currentRound: boolean;
    ship: boolean;
    weather: {
        rain: boolean;
        snow: boolean;
        hungryAnimal: boolean;
    };
    chatLog?: boolean;
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
                        styles.weatherDice + " " + styles[key] + " " + styles[position]
                    }
                    key={key}
                >
                    <Image
                        src={`/UI/scenarios/${key}.png`}
                        fill
                        alt={"pogoda"}
                        sizes={styles.weatherDice}
                    />
                </div>
            );
        }
    });

    const currentRoundClass = props.currentRound ? styles.currentRound : "";

    const containerClass = props.chatLog
        ? logStyles.roundContainer
        : styles.container;

    const picture = props.currentRound ? "current" : props.round;
    return (
        <div className={containerClass}>
            <div className={styles.weather}>
                {weatherEffects}

            </div>
            <Image
                src={"/UI/scenarios/squares/" + picture + ".png"}
                className={styles.square}
                fill
                alt={"runda"}
                sizes={containerClass}
            />
            <div className={styles.round + " " + currentRoundClass}>
                {props.round}
            </div>
            {props.ship && (
                <div className={styles.ship}>
                    <Image
                        src={"/UI/scenarios/boat.png"}
                        alt="Łódź"
                        fill
                        sizes={styles.ship}
                    />
                </div>
            )}
        </div>
    );
}
