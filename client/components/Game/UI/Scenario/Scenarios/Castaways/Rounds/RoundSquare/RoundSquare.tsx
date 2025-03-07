// @flow
import * as React from "react";
import styles from "./RoundSquare.module.css";
import logStyles from "../../../../../ChatLog/LogMessage/LogMessage.module.css";
import ResizableImage from "../../../../../../../DynamicImage/DynamicImage";

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
    const weatherPositions = ["weatherRight", "weatherLeft", "weatherTop"];


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
                        src={`/UI/scenarios/${key}.webp`}
                        alt={"pogoda"}
                    />
                </div>
            );
        }
    });

    



    const imgNumber = props.currentRound ? "current" : props.round;
    return (
        <div className={styles.container}>
            <div className={styles.weather}>
                {weatherEffects}
            </div>
            <div className={`${styles.squareImg} ${props.currentRound && styles.squareImgCurrent}`}>
                <ResizableImage
                    src={"/UI/scenarios/squares/" + imgNumber + ".webp"}
                    className={`${styles.square} ${props.dark && styles.dark}`}
                    fill
                    alt={"runda"}
                />
            </div>
            <div className={`${styles.round} ${!props.dark && props.currentRound && styles.currentRound} ${props.dark && styles.darkRound}`}>
                {props.round}
            </div>
            {props.ship && (
                <div className={styles.ship}>
                    <ResizableImage
                        src={"/UI/scenarios/boat.webp"}
                        alt="Łódź"
                        fill
                        sizes={styles.ship}
                    />
                </div>
            )}
        </div>
    );
}
