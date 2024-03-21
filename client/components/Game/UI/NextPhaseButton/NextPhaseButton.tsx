// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import compassImg from "/public/UI/tokens/compass.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {socketEmitter} from "../../../../pages/_app";

type Props = {
    locked: boolean;
};
export const NextPhaseButton = (props: Props) => {
    function handleClick() {
        if (props.locked) {
            return;
        }
        socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE)
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
