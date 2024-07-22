import styles from "./SessionList.module.css";
import {Session} from "./Session/Session";
import {Header} from "./Header/Header";
import {useEffect, useState} from "react";
import {SOCKET_EVENT, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {SessionBasicInfo} from "@shared/types/Session/Session";
import {useAppDispatch} from "../../store/hooks";
import {socketEmit} from "../../middleware/socketMiddleware";
import {setSocketListener} from "../../pages/api/socket";


interface Props {
    setSessionIdToEnter: (sessionId: string) => void;
}

export function SessionList(props: Props) {
    const [sessionList, setSessionList] = useState<SessionBasicInfo[]>([]);
    const dispatch = useAppDispatch();

    function requestList() {
        dispatch(socketEmit(SOCKET_EVENT.SESSION_LIST_REQUESTED, null))
    }

    useEffect(() => {
        const listeners = [
            setSocketListener(SOCKET_EVENT.SESSION_LIST_CHANGED, () => {
                requestList();
            }),
            setSocketListener(SOCKET_EVENT.SESSION_LIST_SENT, (payload) => {
                setSessionList(payload.sessionList);
            })
        ]
        requestList()
        return () => {
            listeners.forEach((listener) => listener.off());
        }
    })

    return <div className={styles.container}>
        <Header/>
        <div className={styles.sessionList}>
            {sessionList.map((session, i) => {
                return <Session
                    name={session.name}
                    host={session.host}
                    playerAmount={session.players}
                    maxPlayerAmount={session.maxPlayers}
                    scenario={session.scenario}
                    password={session.password}
                    id={session.id}
                    key={i}
                    setEnterSessionId={props.setSessionIdToEnter}
                />
            })}
        </div>
    </div>
}
