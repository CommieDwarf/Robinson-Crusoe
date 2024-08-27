import styles from "./Players.module.css";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {Player} from "./Player/Player";
import {getDuplicatedElements} from "@shared/utils/getDuplicatedElements";

interface Props {
    players: IPlayerRenderData[],
    localPlayer: IPlayerRenderData,
    host: IPlayerRenderData,
}


export function Players(props: Props) {


    const hostControls = props.localPlayer.id === props.host.id;

    const pickedCharacters = props.players.map((player) => player.assignedCharacter.char);
    const duplicatedCharacters = getDuplicatedElements(pickedCharacters);

    console.log(props.players);
    return <div className={styles.container}>
        <div className={styles.playerList}>
            {props.players.map((player) => {
                return <Player
                    player={player}
                    key={player.id}
                    local={props.localPlayer.id === player.id}
                    host={props.host.id === player.id}
                    hostControls={hostControls}
                    duplicatedCharacter={duplicatedCharacters.includes(player.assignedCharacter.char)}
                />
            })}
        </div>
    </div>
}
