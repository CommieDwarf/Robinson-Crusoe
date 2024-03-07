import styles from "./Hunt.module.css";
import ActionSlot from "../ActionSlot";
import beastReverseImg from "/public/UI/cards/reverse/beast.png";
import React from "react";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {getActionSlotDroppableId} from "@shared/utils/getActionSlotDroppableId";
import {ACTION} from "@shared/types/Game/ACTION";

interface Props {
    zIndex: string;
    beastCount: number;
    isDragDisabled: boolean;
}

export default function Hunt(props: Props) {
    const zIndexClass = props.zIndex.includes("hunt")
        ? styles.zIndexIncreased
        : "";
    const lockedClass = props.beastCount === 0;

    return (
        <div className={styles.container + " " + zIndexClass}>
            <div className={styles.card + " " + lockedClass}>
                <ResizableImage src={beastReverseImg} alt="Bestia"/>
            </div>
            <div className={styles.beastCount + " " + styles.locked}>
                {props.beastCount}
            </div>

            {props.beastCount > 0 && (
                <div className={styles.actionSlots}>
                    <div className={styles.actionSlot}>
                        <ActionSlot
                            type={"leader"}
                            action={ACTION.HUNT}
                            uniqueAction={ACTION.HUNT}
                            id={getActionSlotDroppableId(ACTION.HUNT, "", null, 0)}
                            isDragDisabled={props.isDragDisabled}
                        />
                    </div>
                    <div className={styles.actionSlot}>
                        <ActionSlot
                            type={"helper"}
                            action={ACTION.HUNT}
                            uniqueAction={ACTION.HUNT}
                            id={getActionSlotDroppableId(ACTION.HUNT, "", null, 1)}
                            isDragDisabled={props.isDragDisabled}
                        />
                    </div>

                </div>
            )}
        </div>
    );
}
