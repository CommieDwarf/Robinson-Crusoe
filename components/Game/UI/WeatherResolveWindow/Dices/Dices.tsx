// @flow
import * as React from "react";
import styles from "./Dices.module.css";
import Image from "next/image";

import rainImg from "/public/UI/scenarios/rain.png";
import snowImg from "/public/UI/scenarios/snow.png";
import hungryAnimalImg from "/public/UI/scenarios/hungryAnimal.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    animals: boolean;
    rain: boolean;
    snow: boolean;
};
export const Dices = (props: Props) => {
    return (
        <div className={styles.container}>
            {props.rain && (
                <div className={`${styles.dice} ${styles.rain}`}>
                    <ResizableImage src={rainImg} fill alt={"kość deszczu"} sizes={styles.dice}/>
                </div>
            )}
            {props.snow && (
                <div className={`${styles.dice} ${styles.snow}`}>
                    <ResizableImage src={snowImg} fill alt={"kość śniegu"} sizes={styles.dice}/>
                </div>
            )}
            {props.animals && (
                <div className={`${styles.dice} ${styles.animals}`}>
                    <ResizableImage
                        src={hungryAnimalImg}
                        fill
                        alt={"kość wygłodniawych zwierząt"}
                        sizes={styles.dice}
                    />
                </div>
            )}
        </div>
    );
};
