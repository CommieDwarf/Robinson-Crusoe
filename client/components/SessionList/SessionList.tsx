import styles from "./SessionList.module.css";
import {Session} from "./Session/Session";
import {Header} from "./Header/Header";
import {useEffect, useState} from "react";
import {socket, socketEmitter} from "../../pages/_app";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {SessionBasicInfo} from "@shared/types/Session/Session";


// max 25 znakow dla nazwy
export function SessionList() {
    const [sessionList, setSessionList] = useState<SessionBasicInfo[]>([]);

    useEffect(() => {

        socket.on((SOCKET_EMITTER.SESSION_LIST_SENT), (payload: SocketPayloadMap[SOCKET_EMITTER.SESSION_LIST_SENT]) => {
            setSessionList(payload.sessionList);
        })
        socketEmitter.emitRequestSessionList();

        return () => {
            socket.off(SOCKET_EMITTER.SESSION_LIST_SENT);
        }
    }, [])

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
                />
            })}
        </div>
    </div>
}
