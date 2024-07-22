import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import styles from "./ChatLog.module.css";
import {LogMessage} from "./LogMessage/LogMessage";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {isLogMessage} from "@shared/utils/typeGuards/isLogMessage";
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {ModeSwitch} from "./ModeSwitch/ModeSwitch";
import {socketEmit} from "../../../../middleware/socketMiddleware";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";


interface Props {
    enableLog: boolean;
}

export default function ChatLog(props: Props) {


    const [logMode, setLogMode] = useState(false); // false means chat

    const [message, setMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const localUsername = useAppSelector((state) => state.gameSession.data?.localPlayer.username!);

    const messages = useAppSelector((state) => {
            if (logMode) {
                return selectGame(state).logs!
            } else {
                return state.gameSession.data?.chatService.messages!;
            }
        }
    );


    const dispatch = useAppDispatch();

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
            dispatch(socketEmit(SOCKET_EVENT.SEND_MESSAGE, {message: message.trim(), hydrateSessionId: true}))
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
                                return <ChatMessage message={msg} key={i} localUser={localUsername}/>
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
