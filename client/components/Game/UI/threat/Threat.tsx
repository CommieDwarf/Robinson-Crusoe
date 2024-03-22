import React from "react";
import styles from "./Threat.module.css";
import Card from "./Card";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import redArrowCurvedImg from "/public/UI/misc/red-arrow-curved.png";
import getActionSlots from "../getActionSlots";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IEventServiceRenderData} from "@shared/types/Game/EventService/EventService";

interface Props {
    threat: IEventServiceRenderData;
    zIndex: string;
}

function Threat(props: Props) {


    const zIndexClass = props.zIndex.includes("threat") && styles.zIndexIncreased;


    return (
        <div className={styles.container + " " + zIndexClass}>
            <Card card={props.threat.leftSlot} slot={"left"}
            />
            <Card card={props.threat.rightSlot} slot={"right"}
            />
            <div className={styles.arrow}>
                <ResizableImage src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
            </div>
            <div className={styles.curvedArrow}>
                <ResizableImage
                    src={redArrowCurvedImg}
                    fill
                    alt="strzałka"
                    sizes={styles.curvedArrow}
                />
            </div>
            <div className={styles.actionSlots}>
                {props.threat.leftSlot &&
                    (props.threat.leftSlot.meetsRequirement ||
                        props.threat.leftSlot.committedResources)
                    && getActionSlots(props.threat.leftSlot, 0, "left")}
            </div>
            <div className={styles.actionSlots}>
                {props.threat.rightSlot && (props.threat.rightSlot.meetsRequirement
                        || props.threat.rightSlot.committedResources) &&
                    getActionSlots(props.threat.rightSlot, 0, "right")}
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
