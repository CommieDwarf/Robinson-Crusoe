// @flow
import * as React from "react";
import styles from "./RoundSquare.module.css";
import logStyles from "../../../../../ChatLog/LogMessage/LogMessage.module.css";
import ResizableImage from "../../../../../../../ResizableImage/ResizableImage";

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
    dark?: boolean;
}

export function RoundSquare(props: Props) {
    const weatherPositions = ["weatherTop", "weatherRight", "weatherLeft"];


    const allWeatherDices = props.weather.rain && props.weather.snow && props.weather.hungryAnimal;

    const weatherEffects = Object.entries(props.weather).map(([key, value], i) => {
        if (value) {
            const position = weatherPositions.pop();
            if (!position) {
                return;
            }
            return (
                <div
                    className={
                        `${styles.weatherDice} ${styles[key]} ${styles[position]} ${allWeatherDices && i === 0 && styles.firstOfFree}`
                    }
                    key={key}
                >
                    <ResizableImage
                        src={`/UI/scenarios/${key}.png`}
                        alt={"pogoda"}
                    />
                </div>
            );
        }
    });

    

    const currentRoundClass = props.currentRound ? styles.currentRound : "";

    const containerClass = props.chatLog
        ? logStyles.roundContainer
        : styles.container;

    const imgNumber = props.currentRound ? "current" : props.round;
    return (
        <div className={containerClass}>
            <div className={styles.weather}>
                {weatherEffects}
            </div>
            <div className={styles.squareImg}>
                <ResizableImage
                    src={"/UI/scenarios/squares/" + imgNumber + ".png"}
                    className={styles.square}
                    fill
                    alt={"runda"}
                />
            </div>
            <div className={`${styles.round} ${currentRoundClass} ${props.dark && styles.dark}`}>
                {props.round}
            </div>
            {props.ship && (
                <div className={styles.ship}>
                    <ResizableImage
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
