import React from 'react';
import {
    IPlayerCharacterRenderData,
    Wounds
} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {AdventureAction} from "../../../../../../interfaces/ACTION";
import styles from "./Wound.module.css";
import Image from "next/image";
import capitalizeFirstLetter from "../../../../../../utils/capitalizeFirstLetter";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

interface Props {
    character: IPlayerCharacterRenderData,
    bodyPart: keyof Wounds,
    action: AdventureAction,
    count: number,
}

function Wound(props: Props) {
    const positionClassName = props.character.name + capitalizeFirstLetter(props.character.gender) + capitalizeFirstLetter(props.bodyPart);

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
