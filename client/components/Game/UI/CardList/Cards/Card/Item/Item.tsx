import React from "react";
import styles from "./Item.module.css";
import useImg from "/public/UI/icons/use-mark.webp";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import {kebabCase} from "lodash";
import {IItemRenderData, ITEM} from "@shared/types/Game/Equipment/Item";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useAppDispatch} from "../../../../../../../store/hooks";
import {socketEmitAction} from "../../../../../../../middleware/socketMiddleware";

interface Props {
    item: IItemRenderData;

    hideActionSlots?: boolean;


    handleMouseOverButtons: (value: boolean) => void;
}

export default function Item(props: Props) {

    const dispatch = useAppDispatch();

    const buttons = [];

    function handleButtonClick() {
        if (props.item.name !== ITEM.BIBLE) {
            dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.USE_ITEM, props.item.name));
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
                          key={i}
        >
            <DynamicImage src={useImg} alt={"użyj"} fill priority/>
        </div>)
    }

    return (
        <div className={styles.container}>
            <DynamicImage
                src={`/UI/cards/items/${kebabCase(props.item.name)}.webp`}
                alt={props.item.name}
                priority
            />
            <div className={styles.buttons}>
                {buttons}
            </div>
        </div>
    );
}
