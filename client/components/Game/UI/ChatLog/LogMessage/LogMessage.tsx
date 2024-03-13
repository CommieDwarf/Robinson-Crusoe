// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {capitalize} from "lodash";
import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {useTranslation} from 'react-i18next';
import {resources} from "../../../../../I18n/resources";

type Props = {
    message: ILogMessageRenderData;
};


export const LogMessage = (props: Props) => {

    const {t, i18n} = useTranslation();
    const msg = props.message;
    const {content, source} = msg;
    const {code, subject1, subject2, amount} = content;

    const translatedContent = t(code, {
        subject1,
        subject2,
        amount,
        ns: "logMessages",
        defaultValue: code
    })

    let translatedSource


    //TODO: hardcoded.
    const categories = Object.keys(resources.pl.translation);

    categories.forEach((category) => {
        if (i18n.exists(`${category}.${source}`)) {
            // @ts-ignore
            translatedSource = t(`${category}.${source}`)
        }
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
          {capitalize(translatedSource || source)} -{" "}
        </span>
                <span className={styles.message + " " + styles[msg.color]}>
                    {translatedContent}
        </span>
            </div>
        </div>
    );
};
