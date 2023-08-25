// @flow
import * as React from "react";
import styles from "./MysteryCard.module.css";
import Image from "next/image";
import {IMysteryCardRenderData} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {getImgName} from "../../../../../../../utils/getImgName";
import UseButtons from "./UseOverlay/UseOverlay";
import {StorageAction} from "../../../../../../../interfaces/MysteryService/StorageCard";

type Props = {
    mysteryCard: IMysteryCardRenderData;


    hideActionSlots?: boolean;
    use: (cardName: string) => void;
    manageStorage: (cardName: string, type: "mystery", action: StorageAction) => void;
    handleMouseOverButtons: (value: boolean) => void;
};
export const MysteryCard = (props: Props) => {


    function onMouseEnterButton() {
        props.handleMouseOverButtons(true)
    }

    function onMouseLeaveButton() {
        props.handleMouseOverButtons(false);
    }


    function use() {
        props.use(props.mysteryCard.name)
    }


    return (
        <div
            className={`${styles.container}`}
        >
            <Image
                src={`/UI/cards/mystery/${props.mysteryCard.type}/${getImgName(
                    props.mysteryCard.name
                )}.png`}
                fill
                alt={"karta pomysłu"}
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
