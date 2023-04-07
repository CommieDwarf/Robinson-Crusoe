import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Construction.module.css";
import {
    IConstructionRenderData,
    CONSTRUCTION,
} from "../../../../../interfaces/ConstructionService/Construction";
import getActionSlots from "../../getActionSlots";
import {ACTION, ACTION_ITEM} from "../../../../../interfaces/ACTION";
import woodImg from "/public/UI/resources/wood.png";
import leatherImg from "/public/UI/resources/leather.png";
import {objectsEqual} from "../../../../../utils/objectsEqual";

type Props = {
    construction: IConstructionRenderData;
    hideActionSlots?: boolean;
};

function Construction(props: Props) {
    const resources: JSX.Element[] = [];

    Object.entries(props.construction.committedResources).forEach(
        ([key, value]) => {
            for (let i = 0; i < value; i++) {
                resources.push(
                    <div className={styles.committedResource} key={key}>
                        <Image
                            src={`/UI/resources/${key}.png`}
                            fill
                            alt={key}
                            sizes={styles.committedResource}
                        />
                    </div>
                );
            }
        }
    );

    const lockedClass = props.construction.locked ? styles.locked : "";

    let costIcon;

    if (props.construction.name == CONSTRUCTION.WEAPON) {
        costIcon = (
            <div className={styles.costIcon}>
                <div className={styles.costWoodValue}>
                    {props.construction.cost.wood}
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
                    {props.construction.cost.wood}
                </div>
                <div className={styles.woodImage}>
                    <Image src={woodImg} fill alt={"drewno"} sizes={styles.woodImage}/>
                </div>
                <div className={styles.crossLine}></div>
                <div className={styles.costLeatherValue}>
                    {props.construction.cost.leather}
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

    const actionSlots = getActionSlots(props.construction, props.construction.requiredPawnAmount);


    return (
        <div className={styles.construction}>
            <div className={styles.lvlLabel}>Poziom {props.construction.lvl}</div>
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
