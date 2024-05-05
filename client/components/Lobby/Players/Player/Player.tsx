import styles from "./Player.module.css";
import bootKickImg from "/public/UI/boot-kick.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {useTranslation} from "react-i18next";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";


interface Props {
    player: IPlayerRenderData
}


export function Player(props: Props) {

    const {t} = useTranslation();

    return <div className={styles.container}>
        <div className={styles.name}>
            {props.player.username}
        </div>
        <div className={styles.character}>
            <select>
                <option value="cook" className={styles.cookOption}
                >{t("character.cook")}
                </option>
                <option value="explorer">{t("character.explorer")}</option>
                <option value="carpenter">{t("character.carpenter")}</option>
                <option value="cook">{t("character.soldier")}</option>
            </select>
        </div>
        <div className={styles.kickButton}>
            <ResizableImage src={bootKickImg} alt={"bootKick"}/>
        </div>
    </div>
}
