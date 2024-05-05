import styles from "./index.module.css";
import {useTranslation} from "react-i18next";
import ResizableImage from "../../../components/ResizableImage/ResizableImage";
import redArrowCurvedImg from "/public/UI/misc/red-arrow-curved.png";
import Link from "next/link";
import {useState} from "react";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {GameSettings} from "../../../components/Lobby/GameSettings/GameSettings";
import {socketEmitter} from "../../_app";

export interface Props {

}


export function CreateGame() {


    const {t} = useTranslation();


    return <div className={styles.container}>
        <Link href={"../"}>
            <div className={styles.menuButton}>
                <ResizableImage src={redArrowCurvedImg} alt={"menu"}/>
            </div>
        </Link>
        <div className={styles.gameSettings}>
            <GameSettings createGame={true}/>
        </div>
    </div>
}

export default CreateGame;
