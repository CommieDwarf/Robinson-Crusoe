import styles from "./Player.module.css";
import bootKickImg from "/public/UI/boot-kick.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {useTranslation} from "react-i18next";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {ChangeEvent, useState} from "react";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {socketEmitter} from "../../../../pages/_app";
import crownImg from "/public/UI/misc/crown.png";


interface Props {
    player: IPlayerRenderData,
    local: boolean,
    host: boolean,
}


export function Player(props: Props) {

    const {t} = useTranslation();

    const [character, setCharacter] = useState<CHARACTER>(props.player.assignedCharacter.char);

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        console.log("zmiana chara")
        setCharacter(event.currentTarget.value as CHARACTER);
        socketEmitter.emitChangeCharacter({
            char: event.currentTarget.value as CHARACTER
        })
    }


    return <div className={`${styles.container} ${props.local && styles.localPlayer}`}>
        <div className={styles.name}>
            {props.player.username}
            {props.host && <div className={styles.host}>
                <ResizableImage src={"/UI/misc/crown.png"} alt={"host"} fill/>
            </div>}
        </div>

        <div className={styles.character}>
            <select onChange={handleChange} defaultValue={character} disabled={!props.local}>
                <option value={CHARACTER.COOK}>{t("character.cook")}
                </option>
                <option value={CHARACTER.EXPLORER}>{t("character.explorer")}</option>
                <option value={CHARACTER.CARPENTER}>{t("character.carpenter")}</option>
                <option value={CHARACTER.SOLDIER}>{t("character.soldier")}</option>
            </select>
        </div>
        <div className={styles.kickButton}>
            <ResizableImage src={bootKickImg} alt={"bootKick"}/>
        </div>
    </div>
}
