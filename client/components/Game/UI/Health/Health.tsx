import React from "react";
import styles from "./Health.module.css";
import heartImg from "/public/UI/misc/heart.png";
import redHeartImg from "/public/UI/icons/red-heart.png";
import skullImg from "/public/UI/icons/skull.png";
import Threshold from "./Threshold";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ICharacterServiceRenderData} from "@shared/types/Game/CharacterService/CharacterService";
import {getPropsComparator} from "../../../../utils/getPropsComparator";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {

}

function Health(props: Props) {
    let marks: JSX.Element[] = [];
    const characterService = useAppSelector((state) => selectGame(state).characterService!)
    const character = useAppSelector((state) => selectGame(state).localPlayer.character!);


    for (let i = character.maxHealth; i > 0; i--) {
        marks.push(
            <div className={styles.heart} key={i}>
                <ResizableImage
                    src={i === character.health ? redHeartImg : heartImg}
                    fill
                    alt="serce"
                    sizes={styles.heart}
                />
            </div>
        );
        if (character.moraleThresholds.includes(i - 1)) {
            marks.push(
                <Threshold id={i - 1}
                           thresholdAmountForRemoval={characterService.thresholdAmountForRemoval}
                           removed={character.moraleThresholdsRemoved.includes(i - 1)}
                           key={i + 100}
                />
            );
        }
    }
    marks.push(
        <div className={styles.skull} key={2137}>
            <ResizableImage src={skullImg} fill alt="czaszka" sizes={styles.skull}/>
        </div>
    );
    return (
        <div className={styles.container}>
            <div className={styles.health}>{marks}</div>
        </div>
    );
}

export default React.memo(Health, getPropsComparator());
