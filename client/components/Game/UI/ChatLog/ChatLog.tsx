import React, {useEffect, useRef} from "react";
import styles from "./ChatLog.module.css";
import {LogMessage} from "./LogMessage/LogMessage";
import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
}

export default function ChatLog(props: Props) {

    const logMessages = useAppSelector((state) => selectGame(state).logs!);

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
                        {logMessages.map((msg, i) => {
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
