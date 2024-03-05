// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";
import {ILogMessageRenderData} from "@sharedTypes/ChatLog/LogMessage";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import capitalizeFirstLetter from "@sharedUtils/capitalizeFirstLetter";

type Props = {
    message: ILogMessageRenderData;
};
export const LogMessage = (props: Props) => {
    const msg = props.message;
    return (
        <div className={styles.container}>
            <RoundSquare
                round={msg.round}
                currentRound={true}
                ship={false}
                weather={{rain: false, snow: false, hungryAnimal: false}}
                chatLog={true}
            ></RoundSquare>
            <div className={styles.phaseIcon}>
                <ResizableImage
                    src={"/UI/Phase/" + msg.phase + ".png"}
                    fill
                    alt={"faza"}
                    sizes={styles.phaseIcon}
                />
            </div>
            {}
            <div className={styles.messageContent}>
        <span className={styles.messageSource}>
          {capitalizeFirstLetter(msg.source)} -{" "}
        </span>
                <span className={styles.message + " " + styles[msg.color]}>
          {capitalizeFirstLetter(msg.message)}.
        </span>
            </div>
        </div>
    );
};
