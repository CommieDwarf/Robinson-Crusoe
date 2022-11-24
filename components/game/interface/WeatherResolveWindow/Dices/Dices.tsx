// @flow
import * as React from "react";
import styles from "./Dices.module.css";
import Image from "next/image";

type Props = {
    animals: boolean;
    rain: boolean;
    snow: boolean;
};
export const Dices = (props: Props) => {
    return (
        <div className={styles.container}>
            {props.rain && (
                <div className={styles.dice + " " + styles.rain}>
                    <Image
                        src={"/interface/scenarios/rain.png"}
                        layout={"fill"}
                        alt={"kość deszczu"}
                    />
                </div>
            )}
            {props.snow && (
                <div className={styles.dice + " " + styles.snow}>
                    <Image
                        src={"/interface/scenarios/snow.png"}
                        layout={"fill"}
                        alt={"kość śniegu"}
                    />
                </div>
            )}
            {props.animals &&
                <div className={styles.dice + " " + styles.animals}>
                    <Image
                        src={"/interface/scenarios/hungryAnimal.png"}
                        layout={"fill"}
                        alt={"kość wygłodniawych zwierząt"}
                    />
                </div>
            }
        </div>
    );
};
