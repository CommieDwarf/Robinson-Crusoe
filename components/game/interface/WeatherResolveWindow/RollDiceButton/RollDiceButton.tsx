// @flow
import * as React from "react";
import styles from "./RollDiceButton.module.css";
import Image from "next/image";

type Props = {
    rollWeatherDices: () => void;
};
export const RollDiceButton = (props: Props) => {

    function handleClick() {
        props.rollWeatherDices();
    }

    return (
        <div className={styles.container} onClick={handleClick}>
            <Image
                className={"dices"}
                src={"/interface/weather/dices.png"}
                layout={"fill"}
                alt={"losuj"}
            />
            <span className={styles.roll}>Losuj!</span>
        </div>
    );
};
