import React from "react";
import styles from "./Health.module.css";
import heartImg from "/public/UI/misc/heart.png";
import redHeartImg from "/public/UI/icons/red-heart.png";
import skullImg from "/public/UI/icons/skull.png";
import Threshold from "./Threshold";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ICharacterServiceRenderData} from "@shared/types/Game/CharacterService/CharacterService";
import {getObjectsComparator} from "../../../../utils/getObjectsComparator";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {IPlayerCharacterRenderData} from "@shared/types/Game/Characters/PlayerCharacter";

interface Props {
    vertical?: boolean;
    character: IPlayerCharacterRenderData;
    background: boolean;
}

function Health(props: Props) {
    let marks: JSX.Element[] = [];
    const characterService = useAppSelector((state) => selectGame(state)?.characterService!)


    for (let i = props.character.maxHealth; i > 0; i--) {
        marks.push(
            <div className={`${props.vertical ? styles.iconVertical : styles.icon}`} key={i}>
                <ResizableImage
                    src={i === props.character.health ? redHeartImg : heartImg}
                    fill
                    alt="serce"
                />
            </div>
        );
        if (props.character.moraleThresholds.includes(i - 1)) {
            marks.push(
                <Threshold id={i - 1}
                           thresholdAmountForRemoval={characterService.thresholdAmountForRemoval}
                           removed={props.character.moraleThresholdsRemoved.includes(i - 1)}
                           key={i + 100}
                           vertical={props.vertical}
                />
            );
        }
    }
    marks.push(
        <div className={`${props.vertical ? styles.iconVertical : styles.icon} ${props.vertical && styles.verticalWrapper}`} key={2137}>
            <ResizableImage src={skullImg} fill alt="czaszka" sizes={styles.skull}/>
        </div>
    );
    return (
        <div className={`${styles.container} ${props.background && styles.containerBackground} health`}>
            <div className={`${styles.health} ${props.vertical && styles.healthVertical}`}>
                {marks}
                </div>
        </div>
    );
}

export default React.memo(Health, getObjectsComparator());
