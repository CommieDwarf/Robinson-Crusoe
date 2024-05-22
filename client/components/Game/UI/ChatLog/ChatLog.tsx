import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef, useState} from "react";
import styles from "./ChatLog.module.css";
import {LogMessage} from "./LogMessage/LogMessage";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {isLogMessage} from "@shared/utils/typeGuards/isLogMessage";
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {ModeSwitch} from "./ModeSwitch/ModeSwitch";
import {IChatMessageRenderData} from "@shared/types/ChatService/ChatService";
import {socketEmitter} from "../../../../pages/_app";


interface Props {
    enableLog: boolean;
    localUser: string;
}

export default function ChatLog(props: Props) {


    const [logMode, setLogMode] = useState(false); // false means chat

    const [message, setMessage] = useState("");

    const messages = useAppSelector((state) => {
            if (logMode) {
                return selectGame(state).logs!
            } else {
                return state.gameSession.data?.chatService.messages!;
            }
        }
    );


    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({behavior: "smooth", top: scrollRef.current.offsetTop})
        }
    })

    function switchMode() {
        if (!props.enableLog && !logMode) {
            return;
        }
        setLogMode((prev) => !prev);
    }

    const msg: IChatMessageRenderData = {
        timestamp: Date.now(),
        author: "Wiesiek",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt euismod enim, quis fringilla metus rutrum et. Curabitur dictum risus in mattis efficitur. Pellentesque sit amet metus enim. Etiam ultrices nibh lectus, nec eleifend leo tempor nec. Nulla euismod sodales tortor bibendum pretium. Nam massa justo, interdum eu egestas non, auctor quis leo. Duis et neque ac nisl facilisis blandit.",
    }

    function onTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value);
    }

    function onTestAreaKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            onSendMsgClick();
        }
    }

    function onSendMsgClick() {
        if (message.trim().length > 0) {
            socketEmitter.emitSendMessage(message.trim());
            setMessage("");
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.scrollWrapper}>
                <div className={styles.scroll} ref={scrollRef}>
                    <div className={styles.messages}>
                        {messages.map((msg, i) => {
                            if (isLogMessage(msg)) {
                                return <LogMessage message={msg} key={i}/>;
                            } else {
                                return <ChatMessage message={msg} key={i} localUser={props.localUser}/>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                {props.enableLog && <ModeSwitch logMode={logMode} switchMode={switchMode}/>}
                {!logMode && <><textarea className={styles.textArea} onChange={onTextAreaChange} value={message}
                                         onKeyDown={onTestAreaKeyDown}/>
                    <div className={styles.sendButton} onClick={onSendMsgClick}>
                        <i className="icon-paper-plane"></i>
                    </div>
                </>}
            </div>
        </div>
    );
}
