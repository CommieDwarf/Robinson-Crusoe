import styles from "./StartGame.module.css";
import {ReadyButton} from "../ReadyButton";
import {useEffect, useState} from "react";
import {socket, socketEmitter} from "../../../pages/_app";
import compassImg from "/public/UI/tokens/compass.png";
import ResizableImage from "../../ResizableImage/ResizableImage";
import {useRouter} from "next/router";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";

interface Props {
    ready: boolean;
    startEnabled: boolean;
}


export function StartGamePanel(props: Props) {

    const [ready, setReady] = useState(props.ready);

    const router = useRouter();

    useEffect(() => {
        socket.on(SOCKET_EMITTER.GAME_STARTED, (payload: SocketPayloadMap[SOCKET_EMITTER.GAME_STARTED]) => {
            router.push(`/Play?sessionId=${payload.sessionId}`).then(() => {
                socket.off(SOCKET_EMITTER.GAME_STARTED);
            })
        })
    }, [router])


    useEffect(() => {
        setReady(props.ready);
    }, [props.ready])

    function toggleReady() {
        setReady((prev) => {
            socketEmitter.emitSetPlayerReady(!prev);
            return !prev
        });
    }

    function handleStartClick() {
        if (props.startEnabled && props.ready) {
            socketEmitter.emitStartGame();
            console.log("handle start click")
        }
    }

    return <div className={styles.container}>
        <div className={`${styles.item} ${styles.readiness} ${ready ? styles.ready : styles.notReady}`}>
            <ReadyButton ready={ready} disabled={false} onClick={toggleReady}/>
            <h4 className={`${styles.buttonText}`}>GOTOWY?</h4>
        </div>
        <div className={`${styles.item} ${!props.startEnabled && styles.disabled}`} onClick={handleStartClick}>
            <div className={`${styles.startButton}`}>
                <ResizableImage src={compassImg} alt={"start"}/>
            </div>
            <h4 className={`${styles.buttonText}`}>START</h4>
        </div>
    </div>
}
