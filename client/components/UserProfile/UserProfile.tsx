import styles from "./UserProfile.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import dummyAvatarImg from "/public/dummy-avatar.jpg";

import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteAuthCookie} from "../../utils/auth/deleteAuthCookie";
import {userUpdated} from "../../reduxSlices/auth";
import {useEffect, useState} from "react";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {setSocketListener} from "../../pages/api/socket";
import {SessionBasicInfo} from "@shared/types/Session/Session";
import {socketEmit} from "../../middleware/socketMiddleware";

interface Props {
}

export function UserProfile(props: Props) {

    const router = useRouter();
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [sessionsInProgress, setSessionsInProgress] = useState<SessionBasicInfo[] | null>(null);


    function handleSignOut() {
        deleteAuthCookie();
        dispatch(userUpdated(null));
        dispatch(socketEmit(SOCKET_EVENT.DISCONNECT, {}));
        router.push("/signIn").catch((e) => console.error(e));
    }

    if (!sessionsInProgress) {
        requestGameList()
    }

    useEffect(() => {
        const listener = setSocketListener(SOCKET_EVENT.SESSION_LIST_SENT, (payload) => {
            setSessionsInProgress(payload.sessionList);
        })

        requestGameList();

        return () => {
            listener.off();
        }
    }, [])

    function requestGameList() {
        // dispatch(socketEmit(SOCKET_EMITTER.GAMES_IN_PROGRESS_LIST_REQUESTED, null))
    }


    return <div className={styles.container}>

        <div className={styles.avatar}>
            <ResizableImage src={dummyAvatarImg} alt={"avatar"}/>
        </div>
        <h2>{user?.username}</h2>
        <hr/>
        {sessionsInProgress && <>
            <div className={styles.gamesInProgress}>
                <h5 className={styles.gameInProgressTitle}>Zaczęte gry</h5>
                {/*{sessionsInProgress.map((session) => {*/}
                {/*    return <div key={session.id} className={styles.session}>*/}
                {/*        <Session name={session.name} host={session.host} playerAmount={session.players}*/}
                {/*                 maxPlayerAmount={session.maxPlayers}*/}
                {/*                 scenario={session.scenario}*/}
                {/*                 password={false}*/}
                {/*                 id={session.id}*/}
                {/*                 setEnterSessionId={() => {*/}
                {/*                 }}*/}
                {/*                 shortMode={true}*/}
                {/*                 hidePassword={true}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*})}*/}
            </div>
            <hr/>
        </>}

        <span className={styles.signOutLink} onClick={handleSignOut}>Sign out</span>
    </div>
}
