// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import {RoundSquare} from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";
import {useTranslation} from 'react-i18next';
import {resources} from "../../../../../I18n/resources";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";
import capitalize from "@shared/utils/capitalize";

type Props = {
    message: ILogMessageRenderData;
    first: boolean;
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

    const categories = Object.keys(resources.pl.translation);

    categories.forEach((category) => {
        if (i18n.exists(`${category}.${source}`)) {
            if (Object.values(ABILITY).includes(source as ABILITY)) {
                // @ts-ignore
                translatedSource = t(`ability.${source}.name`)
            } else {
                // @ts-ignore
                translatedSource = t(`${category}.${source}`)
            }
        }
    })


    return (
        <div className={`${styles.container} ${props.first && styles.containerBorderless}`}>
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
                  {insertIconsIntoText(capitalize(translatedSource || source), styles.icon)} -{" "}
                </span>
                <span className={styles.message + " " + styles[msg.color]}>
                    {capitalize(translatedContent)}
                </span>
            </div>
        </div>
    );
};
