import styles from "./ControlPanel.module.css";
import {NextPhaseButton} from "../NextPhaseButton/NextPhaseButton";
import React from "react";
import {BackButton} from "../../../BackButton/BackButton";
import {Button} from "./ViewPlayersButton/Button";
import {PlayerReadiness} from "./PlayerReadiness/PlayerReadiness";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";
import playersIconImg from "/public/UI/icons/players.png";
import gearIconImg from "/public/UI/misc/gear.png";
import bookIconImg from "/public/UI/misc/book.png";

interface Props {
    phaseChangeLocked: boolean,
    confirmWindowIsOpen: boolean;
    togglePlayerOverviewOpen: () => void;
    toggleShowOptions: () => void;
    toggleShowGuide: () => void;
}


export function ControlPanel(props: Props) {
    const isPreAction = useAppSelector(state => selectGame(state)?.phaseService.phase! === "preAction");

    function handleOptionsClick() {
        props.toggleShowOptions();
    }

    function handleGuideClick() {
        props.toggleShowGuide();
    }

    return <div className={styles.container}>
        <div className={styles.buttonWrapper}>
            <BackButton url={"/"}/>
        </div>
        <div className={`${styles.buttonWrapper} ${styles.buttonWrapperOptions} tour-settings`}>
            <Button onClick={handleOptionsClick}
                    imgSrc={gearIconImg}
                    borderless={true}
                    filterColor={true}
            />
        </div>
        <div className={`${styles.buttonWrapper} ${styles.guideWrapper} tour-guide`}>
            <Button onClick={handleGuideClick}
                    imgSrc={bookIconImg}
                    borderless={true}
            />
        </div>
        <div className={styles.buttonWrapper}>
            <Button onClick={() => {
                props.togglePlayerOverviewOpen();
            }}
                    imgSrc={playersIconImg}
                    filterColor={true}
            />
        </div>

        {isPreAction && <PlayerReadiness/>}
        <NextPhaseButton
            locked={props.phaseChangeLocked || props.confirmWindowIsOpen}
        />
    </div>
}
