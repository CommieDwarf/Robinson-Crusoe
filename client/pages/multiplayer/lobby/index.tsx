import styles from "./index.module.css";
import {GameSettings} from "../../../components/Lobby/GameSettings/GameSettings";
import {Players} from "../../../components/Lobby/Players/Players";
import {Character} from "../../../components/Lobby/Character/Character";
import {CHARACTER} from "@shared/types/Game/Characters/Character";

export function Lobby() {


    return (
        <div className={styles.container}>
            <div className={styles.chat}>CHAT</div>
            <div className={styles.players}>
                <Players/>
            </div>
            <div className={styles.settings}>
                <GameSettings createGame={false}/>
            </div>
            <div className={styles.char}><Character character={CHARACTER.EXPLORER} gender={"male"}/></div>
        </div>
    )


}


export default Lobby;
