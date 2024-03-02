import Image from "next/image";
import React from "react";
import styles from "./RestArrange.module.css";
import ActionSlot from "../../ActionSlot";
import {
    getActionSlotDroppableId,
} from "../../../../../utils/getActionSlotDroppableId";

import moraleArrowRightImg from "/public/UI/icons/morale-arrow-right.png";
import heartImg from "/public/UI/icons/heart.png";
import moraleIconImg from "/public/UI/icons/morale.png";
import {useTranslation} from "react-i18next";
import {ACTION, ACTION_ITEM} from "../../../../../interfaces/ACTION";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

interface Props {
    pawnAmount: number;
    type: ACTION.ARRANGE_CAMP | ACTION.REST;
}

export default function RestArrange(props: Props) {
    let rewardLabel;

    if (props.type === ACTION.ARRANGE_CAMP) {
        rewardLabel = (
            <div className={styles.activityReward}>
                <div className={styles.determinationReward}>
                    <div className={styles.determinationValue}>2</div>
                    <div className={styles.moraleIcon}>
                        <ResizableImage
                            src={moraleIconImg}
                            alt="token determinacji"
                        />
                    </div>
                </div>
                <div className={styles.moraleReward}>
                    <div className={styles.moraleArrow}>
                        <ResizableImage
                            src={moraleArrowRightImg}
                            alt="strzałka morali"
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        rewardLabel = (
            <div className={styles.activityReward}>
                <div className={styles.plus}>+</div>
                <div className={styles.heart}>
                    <ResizableImage src={heartImg} alt="serce"/>
                </div>
            </div>
        );
    }

    const slotsQuantity = props.pawnAmount == 0 ? 2 : props.pawnAmount + 1;

    const actionSlots = [];

    for (let i = 0; i < slotsQuantity; i++) {
        const actionItem =
            props.type === ACTION.REST ? ACTION_ITEM.REST : ACTION_ITEM.ARRANGE_CAMP;
        const id = getActionSlotDroppableId(props.type, "", null, i);
        actionSlots.push(
            <ActionSlot
                type="leader"
                action={props.type}
                uniqueAction={props.type}
                id={id}
                key={id}
            />
        );
    }

    const [t] = useTranslation();

    return (
        <div className={styles[props.type] + " " + styles.activity}>
            <div className={styles.activityName}>{capitalizeFirstLetter(t(`action.${props.type}`))}</div>
            {rewardLabel}
            <div className={styles.actionSlots}>{actionSlots.map((slot, i) => {
                return <div className={styles.actionSlot} key={i}>{slot}</div>
            })}</div>
        </div>
    );
}
