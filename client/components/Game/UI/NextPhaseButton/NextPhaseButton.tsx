// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import compassImg from "/public/UI/tokens/compass.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";

type Props = {
    goNextPhase: () => void;
    locked: boolean;
};
export const NextPhaseButton = (props: Props) => {
    function handleClick() {
        if (props.locked) {
            return;
        }
        props.goNextPhase();
    }

    const className = props.locked ? styles.locked : "";

    return (
        <div className={styles.container + " " + className} onClick={handleClick}>
            <div className={styles.token}>
                <ResizableImage
                    src={compassImg}
                    alt="następna faza"
                />
            </div>
        </div>
    );
};
