import styles from "./InfoBadge.module.css";
import {useAppSelector} from "../../store/hooks";


export function InfoBadge() {

    const [connected, latency] = useAppSelector((state) =>
        [state.connection.connected, state.connection.latency]);

    return <div className={styles.container}>
        <div>{
            connected ? <span className={styles.connected}>online</span> :
                <span className={styles.disconnected}>offline</span>

        }</div>
        <div>ping: {latency}</div>
    </div>
}
