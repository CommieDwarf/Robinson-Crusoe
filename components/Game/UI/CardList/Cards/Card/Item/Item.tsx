import React, {useState} from "react";
import styles from "./Item.module.css";
import Image from "next/image";
import {IItemRenderData} from "../../../../../../../interfaces/Equipment/Item";
import {getImgName} from "../../../../../../../utils/getImgName";
import useImg from "/public/UI/icons/use-mark.png";

interface Props {
    item: IItemRenderData;

    hideActionSlots?: boolean;

    use: (name: string) => void;

    handleMouseOverButtons: (value: boolean) => void;
}

export default function Item(props: Props) {


    const buttons = [];

    function handleMouseEnter() {
        props.handleMouseOverButtons(true);
    }

    function handleMouseLeave() {
        props.handleMouseOverButtons(false);
    }

    for (let i = 0; i < props.item.uses; i++) {
        buttons.push(<div className={styles.button}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
        >
            <Image src={useImg} alt={"użyj"} fill/>
        </div>)
    }

    return (
        <div className={styles.container}>
            <Image
                src={`/UI/cards/items/${getImgName(props.item.name)}.png`}
                fill
                alt={props.item.name}
                sizes={styles.item}
            />
            <div className={styles.buttons}>
                {buttons}
            </div>
        </div>
    );
}
