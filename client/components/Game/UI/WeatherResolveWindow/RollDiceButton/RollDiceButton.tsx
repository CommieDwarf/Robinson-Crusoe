// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./RollDiceButton.module.css";

import dicesImg from "/public/UI/misc/dices.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {socketEmitter} from "../../../../../pages/_app";

type Props = {};
export const RollDiceButton = (props: Props) => {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        if (!clicked) {
            socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.ROLL_WEATHER_DICES);
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
