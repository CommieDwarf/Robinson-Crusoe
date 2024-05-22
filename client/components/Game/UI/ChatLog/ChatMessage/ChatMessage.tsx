import logMessageStyles from "../LogMessage/LogMessage.module.css";
import * as React from "react";
import {IChatMessageRenderData} from "@shared/types/ChatService/ChatService";
import styles from "./ChatMessage.module.css";

interface Props {
    message: IChatMessageRenderData,
    localUser: string,
}

export function ChatMessage(props: Props) {
    const date = new Date(props.message.timestamp);
    let hour = date.getHours().toString();
    hour = hour.length === 1 ? "0" + hour : hour;
    let minute = date.getMinutes().toString();
    minute = minute.length === 1 ? "0" + minute : minute;

    return <div className={styles.container}>
        <span className={styles.time}>{`${hour}:${minute}`}</span>
        <span
            className={`${styles.author} ${props.localUser === props.message.author && styles.localUser}`}>{props.message.author}:</span>
        <span className={styles.messageContent}>
            {props.message.content}
        </span>
    </div>
}
