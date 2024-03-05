// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./RollDiceButton.module.css";

import dicesImg from "/public/UI/misc/dices.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    rollWeatherDices: () => void;
};
export const RollDiceButton = (props: Props) => {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        if (!clicked) {
            props.rollWeatherDices();
            setClicked(true);
        }
    }

    const clickedClass = clicked ? styles.clicked : styles.notClicked;

    return (
        <div
            className={`${styles.container} ${clickedClass}`}
            onClick={handleClick}
        >
            <ResizableImage
                className={"dices"}
                src={dicesImg}
                fill
                alt={"losuj"}
                sizes={styles.container}
            />
            <span className={styles.roll}>Losuj!</span>
        </div>
    );
};
