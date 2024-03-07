// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {capitalize} from "lodash";
import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";

type Props = {
    message: ILogMessageRenderData;
};


//TODO: zrób odkodowywanie
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
          {capitalize(msg.source)} -{" "}
        </span>
                <span className={styles.message + " " + styles[msg.color]}>

                    {msg.content.code}
        </span>
            </div>
        </div>
    );
};
