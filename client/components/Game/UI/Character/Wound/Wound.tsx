import React from 'react';

import styles from "./Wound.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {capitalize} from "lodash";
import {IPlayerCharacterRenderData, Wounds} from "@shared/types/Game/Characters/PlayerCharacter";
import {AdventureAction} from "@shared/types/Game/ACTION";

interface Props {
    character: IPlayerCharacterRenderData,
    bodyPart: keyof Wounds,
    action: AdventureAction,
    count: number,
}

function Wound(props: Props) {
    const positionClassName = props.character.name + capitalize(props.character.gender) + capitalize(props.bodyPart);

    const style = {
        transform: `translate(${props.count * 5}px)`
    }


    return (
        <div className={`${styles.container} ${styles[positionClassName]}`} style={style}>
            <ResizableImage src={`/UI/characters/wounds/${props.action}.png`} alt={"rana"} sizes={styles.container}
                            fill/>
        </div>
    );
}

export default Wound;
