import React from "react";
import styles from "./Item.module.css";
import Image from "next/image";
import {IItemRenderData, ITEM} from "../../../../../../../interfaces/Equipment/Item";
import {getImgName} from "../../../../../../../utils/getImgName";
import useImg from "/public/UI/icons/use-mark.png";

interface Props {
    item: IItemRenderData;

    hideActionSlots?: boolean;

    use: (item: ITEM) => void;

    handleMouseOverButtons: (value: boolean) => void;
}

export default function Item(props: Props) {


    const buttons = [];

    function handleButtonClick() {
        if (props.item.name !== ITEM.BIBLE) {
            props.use(props.item.name);
            handleMouseLeave();
        }
    }

    function handleMouseEnter() {
        props.handleMouseOverButtons(true);
    }

    function handleMouseLeave() {
        props.handleMouseOverButtons(false);
    }

    const buttonDisabledClass = props.item.name === ITEM.BIBLE ? styles.buttonDisabled : "";

    for (let i = 0; i < props.item.uses; i++) {
        buttons.push(<div className={`${styles.button} ${buttonDisabledClass}`}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onClick={handleButtonClick}
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
