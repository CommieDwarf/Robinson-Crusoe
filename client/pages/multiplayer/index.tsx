import styles from "./index.module.css";
import {SessionList} from "../../components/SessionList/SessionList";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import Link from "next/link";
import {useEffect, useState} from "react";
import {SOCKET_EVENT_CLIENT} from "@shared/types/Requests/Socket";
import {useRouter} from "next/router";
import {SmallWindow} from "../../components/SessionList/SmallWindow/SmallWindow";
import {EnterPassword} from "../../components/SessionList/SmallWindow/EnterPassword/EnterPassword";
import {Message} from "../../components/SessionList/SmallWindow/Error/Message";
import {BackButton} from "../../components/BackButton/BackButton";
import {useAppDispatch} from "../../store/hooks";
import {socketEmit} from "../../middleware/socketMiddleware";
import {setSocketListener} from "../api/socket";
import {SaveList} from "../../components/SaveList/SaveList";
import {DraggableWindow} from "../../components/Game/UI/DraggableWindow/DraggableWindow";

export function Multiplayer() {

    const {t} = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch()

    const [sessionIdToJoin, setSessionIdToJoin] = useState("");
    const [message, setMessage] = useState(router.query.msg as string);

    const [showSaveList, setShowSaveList] = useState(false);


    function setSessionIdToEnter(sessionId: string) {
        setSessionIdToJoin(sessionId);
    }

    function closeWindow() {
        setSessionIdToJoin("");
        setMessage("");
    }

    function handleRefreshClick() {
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.SESSION_LIST_REQUESTED, null))
    }

    function handleLoadClick() {
        setShowSaveList((prev) => !prev);
    }

    useEffect(() => {
        const listeners = [
            setSocketListener(SOCKET_EVENT_CLIENT.JOIN_SESSION_RESPONSE, (payload) => {
                if (payload.error) {
                    setMessage(payload.error);
                    return;
                }
                if (payload.sessionId) {
                    router.push(`/multiplayer/lobby/${payload.sessionId}`).then();
                }
            })
        ]

        return () => {
            listeners.forEach((listener) => listener.off())
        }
    }, [router])

    useEffect(() => {
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SAVE_LIST, {}));
    }, [])

    function loadSaveGame() {

    }

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.buttons}>
                    <div className={styles.backButton}>
                        <BackButton/>
                    </div>
                    <div className={`menuButton`} onClick={handleRefreshClick}>
                        {capitalize(t("menu.refresh"))}
                    </div>
                    <Link href={"./multiplayer/creategame"} className={"menuButton"}>
                        <div>
                            {capitalize(t("menu.create game"))}
                        </div>
                    </Link>
                    <div className={`menuButton`} onClick={handleLoadClick}>
                        {capitalize(t("menu.load game"))}
                    </div>

                </div>
                <div className={styles.joinBySessionId}>
                    <div className={`${styles.joinBySessionIdText} nonSelectable`}>
                        {capitalize(t("menu.join with game code"))}
                    </div>
                    <div className={styles.joinBySessionIdInput}>
                        <input type={"text"}></input>
                    </div>
                    <div className={"menuButton"}>
                        {capitalize(t("menu.join"))}
                    </div>
                </div>
            </div>
            <SessionList setSessionIdToEnter={setSessionIdToEnter}/>
            {sessionIdToJoin && <SmallWindow closeWindow={closeWindow}>
                <EnterPassword sessionId={sessionIdToJoin} setSessionIdToEnter={setSessionIdToEnter}/>
            </SmallWindow>}
            {message && <SmallWindow closeWindow={closeWindow}>
                <Message message={message}/>
            </SmallWindow>}

            {showSaveList && <DraggableWindow padding={"5px 10px 5px 10px"} onClose={handleLoadClick}>
                <SaveList/>
            </DraggableWindow>}

        </div>)
}

export default Multiplayer
