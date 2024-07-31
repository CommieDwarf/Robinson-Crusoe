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
import {usePrevious} from "@restart/hooks";


interface Props {
    enableLog: boolean;
}

export default function ChatLog(props: Props) {


    const [logMode, setLogMode] = useState<boolean>(props.enableLog); // false means chat

    const [message, setMessage] = useState("");

    const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);

    const [unreadMessages, setUnreadMessages] = useState({
        log: false,
        chat: false
    })


    const scrollRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    const localUsername = useAppSelector((state) => state.gameSession.data?.localPlayer.username!);
    const chatMessages = useAppSelector((state) => state.gameSession.data?.chatService.messages);
    const logMessages = useAppSelector((state) => selectGame(state)?.logs)

    const dispatch = useAppDispatch();


    const prevChatMessages = usePrevious(chatMessages);
    const prevLogMessages = usePrevious(logMessages);

    useEffect(() => {
        if (!prevChatMessages || !prevLogMessages) {
            return;
        }
        const chatMessagesChanged = prevChatMessages?.length !== chatMessages?.length;
        const logMessagesChanged = prevLogMessages?.length !== logMessages?.length;

        if (logMode && chatMessagesChanged) {
            setUnreadMessages(prev => ({...prev, chat: true}));
        }
        if (!logMode && logMessagesChanged) {
            setUnreadMessages(prev => ({...prev, log: true}));
        }


        if (((logMode && logMessagesChanged) || (!logMode && chatMessagesChanged))
            && isScrollAtBottom) {
            console.log("should be scrolling!")
            scrollToBottom(true);
        }


    }, [chatMessages?.length, logMessages?.length, logMode, prevChatMessages, prevLogMessages, isScrollAtBottom])


    function switchMode() {
        if (!props.enableLog && !logMode) {
            return;
        }
        setLogMode((prev) => {
            return !prev
        });
        scrollToBottom();
    }

    useEffect(() => {
        setUnreadMessages((prev) => {
            const newState = {...prev};
            logMode ? newState.log = false : newState.chat = false;
            return newState;
        })
    }, [logMode])


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
            scrollToBottom(true);
        }
    }

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        const messagesHeight = messagesRef.current?.clientHeight;
        const scrollHeight = scrollRef.current?.clientHeight;
        if (!messagesHeight || !scrollHeight) {
            return;
        }
        const scrollTolerance = 10;
        if (messagesHeight - scrollHeight < event.currentTarget.scrollTop + scrollTolerance) {
            setIsScrollAtBottom(true);
        } else {
            setIsScrollAtBottom(false)
        }
    }

    function scrollToBottom(smooth?: boolean) {
        if (!scrollRef.current) {
            return;
        }
        scrollRef.current.scrollBy({
            behavior: smooth ? "smooth" : "auto",
            top: scrollRef.current.scrollHeight
        });
    }


    const messages = logMode ? logMessages : chatMessages;


    return (
        <div className={styles.container}>
            <div className={styles.scrollWrapper}>
                <div className={styles.scroll} ref={scrollRef} onScroll={handleScroll}>
                    <div className={styles.messages} ref={messagesRef}>
                        {messages?.map((msg, i) => {
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
                {props.enableLog &&
                    <ModeSwitch logMode={logMode}
                                switchMode={switchMode}
                                unreadMessages={unreadMessages}/>
                }
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
