import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import {IEventServiceRenderData} from "../../../../interfaces/EventService/EventService";
import {EVENT_TYPE} from "../../../../interfaces/EventService/EventCard";
import {getDroppableID} from "../../../../utils/getDroppableID";
import {ACTION, ACTION_ITEM} from "../../../../interfaces/ACTION";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import redArrowCurvedImg from "/public/UI/misc/red-arrow-curved.png";
import {objectsEqual} from "../../../../utils/objectsEqual";
import getActionSlots from "../getActionSlots";

interface Props {
    threat: IEventServiceRenderData;
    zIndex: string;
}

function Threat(props: Props) {
    const leftCard = props.threat.leftSlot;
    const rightCard = props.threat.rightSlot;


    const zIndexClass = props.zIndex.includes("threat")
        ? styles.zIndexIncreased
        : "";

    return (
        <div className={styles.container + " " + zIndexClass}>
            <Card card={props.threat.leftSlot}/>
            <Card card={props.threat.rightSlot}/>
            <div className={styles.arrow}>
                <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
            </div>
            <div className={styles.curvedArrow}>
                <Image
                    src={redArrowCurvedImg}
                    fill
                    alt="strzałka"
                    sizes={styles.curvedArrow}
                />
            </div>
            <div className={styles.actionSlots}>
                {props.threat.leftSlot && getActionSlots(props.threat.leftSlot, 0, "left")}
            </div>
            <div className={styles.actionSlots}>
                {props.threat.rightSlot && getActionSlots(props.threat.rightSlot, 0, "left")}
            </div>
        </div>
    );
}

function areEqual(prevProps: Props, nextProps: Props) {
    return (
        prevProps.zIndex.includes("threat") ===
        nextProps.zIndex.includes("threat") &&
        objectsEqual(prevProps.threat, nextProps.threat)
    );
}

export default React.memo(Threat, areEqual);
