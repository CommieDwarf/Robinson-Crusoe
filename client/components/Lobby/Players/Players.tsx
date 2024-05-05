import styles from "./Players.module.css";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {Player} from "./Player/Player";

interface Props {
    players: IPlayerRenderData[]
}


export function Players(props: Props) {
    return <div className={styles.container}>
        <div className={styles.playerList}>
            {props.players.map((player) => {
                return <Player player={player} key={player.id}/>
            })}
        </div>
    </div>
}
