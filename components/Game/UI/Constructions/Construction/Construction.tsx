import Image from "next/image";
import React from "react";
import styles from "./Construction.module.css";
import {
    IConstructionRenderData,
    CONSTRUCTION,
} from "../../../../../interfaces/ConstructionService/Construction";
import getActionSlots from "../../getActionSlots";
import woodImg from "/public/UI/resources/wood.png";
import leatherImg from "/public/UI/resources/leather.png";
import {objectsEqual} from "../../../../../utils/objectsEqual";

type Props = {
    construction: IConstructionRenderData;
    hideActionSlots?: boolean;
};

function Construction(props: Props) {
    const resources: JSX.Element[] = [];

    if (props.construction.committedResources) {
        const resType = props.construction.committedResources.type;
        for (let i = 0; i < props.construction.committedResources?.amount; i++) {
            resources.push(
                <div className={styles.committedResource} key={i}>
                    <Image
                        src={`/UI/resources/${resType}.png`}
                        fill
                        alt={resType}
                        sizes={styles.committedResource}
                    />
                </div>
            );
        }
    }


    const lockedClass = props.construction.locked ? styles.locked : "";

    let costIcon;

    if (props.construction.name == CONSTRUCTION.WEAPON) {
        costIcon = (
            <div className={styles.costIcon}>
                <div className={styles.costWoodValue}>
                    {props.construction.resourceCost?.amount}
                </div>
                <div className={styles.woodImage}>
                    <Image src={woodImg} fill alt={"wood"} sizes={styles.woodImage}/>
                </div>
            </div>
        );
    } else {
        costIcon = (
            <div className={styles.costIcon}>
                <div className={styles.costWoodValue}>
                    {props.construction.resourceCost?.amount}
                </div>
                <div className={styles.woodImage}>
                    <Image src={woodImg} fill alt={"drewno"} sizes={styles.woodImage}/>
                </div>
                <div className={styles.crossLine}></div>
                <div className={styles.costLeatherValue}>
                    {props.construction.optionalResourceCost?.amount}
                </div>
                <div className={styles.leatherImage}>
                    <Image
                        src={leatherImg}
                        fill
                        alt={"skóra"}
                        sizes={styles.leatherImage}
                    />
                </div>
            </div>
        );
    }
    let actionSlots;
    if (props.construction.requiredPawnAmount) {
        actionSlots = getActionSlots(props.construction, props.construction.requiredPawnAmount);
    }


    return (
        <div className={styles.construction}>
            <div className={styles.lvlLabel}>Poziom {props.construction.lvl}
                {props.construction.temporaryBoost > 0 &&
                    <span className={styles.lvlBoosted}>(+{props.construction.temporaryBoost})</span>
                }
            </div>
            <div className={styles.cost}>{costIcon}</div>
            <div className={styles.build}>
                <div className={styles.actionSlots}>
                    {!props.construction.locked && !props?.hideActionSlots && (
                        <>
                            {actionSlots}

                        </>
                    )}
                </div>
                <div className={styles.committedResources}>{resources}</div>
            </div>
            <div
                className={`${styles[props.construction.name]} ${
                    props.construction.lvl === 0 ? styles.level0 : ""
                }`}
            >
                <Image
                    src={`/UI/constructions/${props.construction.name}.png`}
                    fill
                    alt={props.construction.name}
                    sizes={`${styles[props.construction.name]} ${
                        props.construction.lvl === 0 ? styles.level0 : ""
                    }`}
                />
            </div>
            <div className={styles.structureIcon}>
                <Image
                    src={`/UI/constructions/${props.construction.name}-icon.png`}
                    fill
                    alt={props.construction.name + " icon"}
                    sizes={styles.structureIcon}
                />
            </div>
        </div>
    );
}

function areEqual(prevProps: Props, nextProps: Props) {
    return objectsEqual(prevProps, nextProps);
}

export default React.memo(Construction, areEqual);
