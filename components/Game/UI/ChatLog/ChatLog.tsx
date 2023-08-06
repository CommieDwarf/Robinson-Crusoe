import React, {useEffect, useRef} from "react";
import styles from "./ChatLog.module.css";
import {LogMessage} from "./LogMessage/LogMessage";
import {ILogMessageRenderData} from "../../../../interfaces/ChatLog/LogMessage";

interface Props {
    logMessages: ILogMessageRenderData[];
}

export default function ChatLog(props: Props) {

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({behavior: "smooth", top: scrollRef.current.offsetTop})
        }
    })


    return (
        <div className={styles.container}>
            <div className={styles.scrollWrapper}>
                <div className={styles.scroll} ref={scrollRef}>
                    <div className={styles.messages}>
                        {props.logMessages.map((msg, i) => {
                            return <LogMessage message={msg} key={i}/>;
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.tabButton}>Log</div>
            <div className={styles.tabButton}>Chat</div>
        </div>
    );
}
