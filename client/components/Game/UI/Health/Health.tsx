import React from "react";
import styles from "./Health.module.css";
import heartImg from "/public/UI/misc/heart.png";
import redHeartImg from "/public/UI/icons/red-heart.png";
import skullImg from "/public/UI/icons/skull.png";
import Threshold from "./Threshold";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ICharacterServiceRenderData} from "@shared/types/Game/CharacterService/CharacterService";
import {getPropsComparator} from "../../../../utils/getPropsComparator";

interface Props {
    value: number;
    maxHealth: number;
    moraleThresholds: number[];
    characterService: ICharacterServiceRenderData;
}

function Health(props: Props) {
    let marks: JSX.Element[] = [];


    for (let i = props.maxHealth; i > 0; i--) {
        marks.push(
            <div className={styles.heart} key={i}>
                <ResizableImage
                    src={i === props.value ? redHeartImg : heartImg}
                    fill
                    alt="serce"
                    sizes={styles.heart}
                />
            </div>
        );
        if (props.moraleThresholds.includes(i - 1)) {
            marks.push(
                <Threshold id={i - 1}
                           thresholdAmountForRemoval={props.characterService.thresholdAmountForRemoval}
                    //TODO: CHANGE HARDCODED CHAR
                           removed={props.characterService.playerCharacters[0].moraleThresholdsRemoved.includes(i - 1)}
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
