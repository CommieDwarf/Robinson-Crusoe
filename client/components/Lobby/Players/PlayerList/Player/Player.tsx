import styles from "./Player.module.css";
import bootKickImg from "/public/UI/boot-kick.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import gatherImg from "/public/UI/actions/gather.png";
import {useTranslation} from "react-i18next";

export function Player() {

    const {t} = useTranslation();

    return <div className={styles.container}>
        <div className={styles.name}>
            User22
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
