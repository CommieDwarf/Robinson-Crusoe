import React from "react";
import styles from "./Item.module.css";
import {IItemRenderData, ITEM} from "../../../../../../../interfaces/Equipment/Item";
import {formatToKebabCase} from "../../../../../../../utils/formatToKebabCase";
import useImg from "/public/UI/icons/use-mark.png";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";

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
            <ResizableImage src={useImg} alt={"użyj"} fill/>
        </div>)
    }

    return (
        <div className={styles.container}>
            <ResizableImage
                src={`/UI/cards/items/${formatToKebabCase(props.item.name)}.png`}
                alt={props.item.name}
            />
            <div className={styles.buttons}>
                {buttons}
            </div>
        </div>
    );
}
