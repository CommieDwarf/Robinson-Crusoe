// @flow
import * as React from "react";
import styles from "../Invention/Invention.module.css";
import Image from "next/image";
import {IMysteryCardRenderData} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {useRef, useState} from "react";
import {getImgName} from "../../../../../../../utils/getImgName";
import UseButtons from "./UseOverlay/UseOverlay";
import {StorageAction} from "../../../../../../../interfaces/MysteryService/StorageCard";

type Props = {
    mysteryCard: IMysteryCardRenderData;
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    hideActionSlots?: boolean;
    use: (cardName: string) => void;
    manageStorage: (cardName: string, type: "mystery", action: StorageAction) => void;
    handleEnlarge: (value: boolean) => void;
    enlarged: boolean;
    handleMouseOverButtons: (value: boolean) => void;
};
export const MysteryCard = (props: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);


    function onMouseEnterButton() {
        props.handleMouseOverButtons(true)
    }

    function onMouseLeaveButton() {
        props.handleMouseOverButtons(false);
    }

    function handleLoad() {
        setImageLoaded(true);
    }

    function handleClick(event: React.MouseEvent) {
        props.handleEnlarge(!props.enlarged);
    }

    function use() {
        props.use(props.mysteryCard.name)
    }


    const wrapperStyle = {
        left: props.column * 95,
        top: props.row * 140,
    };

    const enlargedClass = props.enlarged
        ? styles.inventionEnlarged
        : styles.zIndexTransition;

    wrapperStyle.top = props.enlarged ? props.top : wrapperStyle.top;
    wrapperStyle.left = props.enlarged ? 60 : wrapperStyle.left;

    const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";


    return (
        <div
            className={`${styles.invention} ${enlargedClass} ${zIndexClass}`}
            onClick={handleClick}
            style={wrapperStyle}
        >
            <Image
                src={`/UI/cards/mystery/${props.mysteryCard.type}/${getImgName(
                    props.mysteryCard.name
                )}.png`}
                fill
                alt={"karta pomysłu"}
                onLoad={handleLoad}
                sizes={styles.invention}
                placeholder="blur"
                blurDataURL={`/UI/cards/${props.mysteryCard.type}/${props.mysteryCard.name}.png`}
            />
            {"uses" in props.mysteryCard && (
                <UseButtons card={props.mysteryCard} onMouseEnterButton={onMouseEnterButton}
                            onMouseLeaveButton={onMouseLeaveButton}
                            manageStorage={props.manageStorage}
                            use={use}
                ></UseButtons>
            )}
        </div>
    );
};
