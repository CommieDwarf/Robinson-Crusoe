import logMessageStyles from "../LogMessage/LogMessage.module.css";
import * as React from "react";
import {IChatMessageRenderData} from "@shared/types/ChatService/ChatService";
import styles from "./ChatMessage.module.css";
import {isSystemMsg} from "@shared/utils/typeGuards/isSystemMsg";
import {useTranslation} from "react-i18next";

interface Props {
    message: IChatMessageRenderData,
    localUser: string,
    first: boolean,
}

export function ChatMessage(props: Props) {
    const date = new Date(props.message.timestamp);
    let hour = date.getHours().toString();
    hour = hour.length === 1 ? "0" + hour : hour;
    let minute = date.getMinutes().toString();
    minute = minute.length === 1 ? "0" + minute : minute;

    const {t} = useTranslation("systemMessages");
    const content = isSystemMsg(props.message) ?
        t(`${props.message.content}`,
            {
                subject1: props.message.subject1,
                defaultValue: props.message.content
            }) :
        props.message.content;

    return <div className={`${styles.container}
     ${props.first && styles.containerBorderless} ${isSystemMsg(props.message) && styles.system}`}>
        <span className={styles.time}>{`${hour}:${minute}`}</span>
        <span
            className={`
                ${styles.author}
                ${!isSystemMsg(props.message) && props.localUser === props.message.author && styles.localUser}
              `}>
            {props.message.author}:
        </span>
        <span className={`${styles.messageContent}`}>
            {content as string}
        </span>
    </div>
}
