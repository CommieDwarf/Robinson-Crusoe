import styles from "./InfoBadge.module.css";
import {useAppSelector} from "../../store/hooks";


export function InfoBadge() {
    const connected = useAppSelector((state) => state.connection.socketConnected);
    const latency = useAppSelector((state) => state.connection.latency);

    return <div className={styles.container}>
        <div>{
            connected ? <span className={styles.connected}>online</span> :
                <span className={styles.disconnected}>offline</span>

        }</div>
        <div>ping: {latency}</div>
    </div>
}
