import styles from "./PlayerReadiness.module.css";
import {useAppSelector} from "../../../../../store/hooks";
import {ReadyCheckbox} from "./ReadyCheckbox/ReadyCheckbox";
import { selectPlayers } from "../../../../../reduxSlices/gameSession";


export function PlayerReadiness() {
    const players = useAppSelector((state) => selectPlayers(state))?.filter((p) => !p.prime);
    const localPlayer = useAppSelector(state => state.gameSession.data?.localPlayer);

    if (!players || !localPlayer) {
        return null;
    }

    return <div className={styles.container}>
        {players.map(player => {
            return <ReadyCheckbox player={player} key={player.id} local={localPlayer.id === player.id}/>
        })}
    </div>
}
