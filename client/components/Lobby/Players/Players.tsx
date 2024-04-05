import styles from "./Players.module.css";
import {PlayerList} from "./PlayerList/PlayerList";

export function Players() {


    return <div className={styles.container}>
        <div className={styles.playerList}>
            <PlayerList/>
        </div>
    </div>
}
