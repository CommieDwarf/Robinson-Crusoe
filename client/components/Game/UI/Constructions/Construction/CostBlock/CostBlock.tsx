import styles from "./CostBlock.module.css";

import {Record} from "./Record/Record";
import React from "react";
import crossLineImg from "/public/UI/misc/cross-line.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";

interface ResourceCost {
    type: "leather" | "wood",
    amount: number,
}

interface Props {
    resource1: ResourceCost | null;
    resource2: ResourceCost | null;

    committedResourceType: "leather" | "wood" | null;
    canBeSwitched: boolean;
    onClick: (resource: "leather" | "wood") => void;
    ownedResources: IBasicResourcesAmount;
}

export function CostBlock(props: Props) {

    function handleWoodClick() {
        props.onClick("wood");
    }

    function handleLeatherClick() {
        props.onClick("leather");
    }


    const woodClickable = props.committedResourceType === "leather" && props.canBeSwitched;
    const leatherClickable = props.committedResourceType === "wood" && props.canBeSwitched;

    return <div className={styles.container}>
        {props.resource1 &&
            <div className={`${styles.resource1} ${styles.resource} ${woodClickable ? styles.resourceClickable : ""}`}
                 onClick={handleWoodClick}
            >
                <Record value={props.resource1.amount} type={props.resource1.type}
                        canAfford={props.ownedResources[props.resource1.type] >= props.resource1.amount}
                        committed={props.resource1.type === props.committedResourceType}
                />
            </div>}
        {props.resource2 &&
            <div className={styles.diagonal}>
                <ResizableImage src={crossLineImg} alt={""} fill/>
            </div>
        }
        {props.resource2 &&
            <div
                className={`${styles.resource2} ${styles.resource} ${leatherClickable ? styles.resourceClickable : ""}`}
                onClick={handleLeatherClick}
            >
                <Record value={props.resource2.amount} type={props.resource2.type}
                        canAfford={props.ownedResources[props.resource2.type] >= props.resource2.amount}
                        committed={props.resource2.type === props.committedResourceType}
                />
            </div>
        }
    </div>
}
