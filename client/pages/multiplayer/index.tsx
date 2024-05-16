import styles from "./index.module.css";
import {SessionList} from "../../components/SessionList/SessionList";
import ResizableImage from "../../components/ResizableImage/ResizableImage";

import menuIcon from "/public/UI/icons/menu.png";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import Link from "next/link";
import {useEffect, useState} from "react";
import {socket, socketEmitter} from "../_app";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {useRouter} from "next/router";
import {SmallWindow} from "../../components/SessionList/SmallWindow/SmallWindow";
import {EnterPassword} from "../../components/SessionList/SmallWindow/EnterPassword/EnterPassword";
import {Message} from "../../components/SessionList/SmallWindow/Error/Message";

interface Props {

}

export function Multiplayer() {

    const {t} = useTranslation();

    const [sessionIdToJoin, setSessionIdToJoin] = useState("");
    const router = useRouter();
    const [message, setMessage] = useState(router.query.msg as string);


    function setSessionIdToEnter(sessionId: string) {
        setSessionIdToJoin(sessionId);
    }

    function closeWindow() {
        setSessionIdToJoin("");
        setMessage("");
    }

    function handleRefreshClick() {
        socketEmitter.emitRequestSessionList();
    }


    useEffect(() => {
        socket.on(SOCKET_EMITTER.JOIN_SESSION_RESPONSE, (payload: SocketPayloadMap[SOCKET_EMITTER.JOIN_SESSION_RESPONSE]) => {
            if (payload.error) {
                setMessage(payload.error);
                return;
            }
            if (payload.sessionId) {
                router.push(`/multiplayer/lobby/?sessionId=${payload.sessionId}`);
            }
        })
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.buttons}>
                    <Link href={"../"}>
                        <div className={styles.menuButton}>
                            <ResizableImage src={menuIcon} alt={"Menu"}/>
                        </div>
                    </Link>
                    <div className={`${styles.button} ${styles.buttonRefresh}`} onClick={handleRefreshClick}>
                        {capitalize(t("menu.refresh"))}
                    </div>
                    <Link href={"./multiplayer/creategame"}>
                        <div className={styles.button}>
                            {capitalize(t("menu.create game"))}
                        </div>
                    </Link>
                </div>
                <div className={styles.joinBySessionId}>
                    <div className={styles.joinBySessionIdText}>
                        {capitalize(t("menu.join with game code"))}
                    </div>
                    <div className={styles.joinBySessionIdInput}>
                        <input type={"text"}></input>
                    </div>
                    <div className={styles.button}>
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
        </div>)
}

export default Multiplayer
