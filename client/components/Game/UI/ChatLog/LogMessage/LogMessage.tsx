// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {capitalize} from "lodash";
import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import i18next from "i18next";
import {resources} from "../../../../../I18n/resources";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {useTranslation} from 'react-i18next';

type Props = {
    message: ILogMessageRenderData;
};


//TODO: zrób odkodowywanie
export const LogMessage = (props: Props) => {

    const {t} = useTranslation();
    const msg = props.message;
    const {content} = msg;
    const {code, subject1, subject2, amount} = content;

    const translated = t(code, {
        subject1,
        subject2,
        amount,
        ns: "logMessages",
        defaultValue: code
    })
    

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

                    {translated}
        </span>
            </div>
        </div>
    );
};
