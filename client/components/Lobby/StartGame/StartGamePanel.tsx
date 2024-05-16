import styles from "./StartGame.module.css";
import {ReadyButton} from "../ReadyButton";
import {useState} from "react";
import {socketEmitter} from "../../../pages/_app";


interface Props {
    ready: boolean;
}


export function StartGamePanel(props: Props) {

    const [ready, setReady] = useState(props.ready);


    function toggleReady() {
        setReady((prev) => {
            socketEmitter.emitSetPlayerReady(!prev);
            return !prev
        });
    }

    return <div className={styles.container}>
        <div className={`${styles.item} ${styles.readiness} ${ready ? styles.ready : styles.notReady}`}>
            <h4>GOTOWOŚĆ</h4>
            <ReadyButton ready={ready} disabled={false} onClick={toggleReady}/>
        </div>

    </div>
}
