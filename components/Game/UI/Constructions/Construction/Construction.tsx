import Image from "next/image";
import React from "react";
import styles from "./Construction.module.css";
import {
    IConstructionRenderData,
    CONSTRUCTION,
} from "../../../../../interfaces/ConstructionService/Construction";
import getActionSlots from "../../getActionSlots";
import {objectsEqual} from "../../../../../utils/objectsEqual";
import {CostBlock} from "./CostBlock/CostBlock";
import {IBasicResourcesAmount} from "../../../../../interfaces/Resources/Resources";
import crossLineImg from "/public/UI/misc/cross-line.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    construction: IConstructionRenderData;
    hideActionSlots?: boolean;
    switchCommittedResources: (construction: CONSTRUCTION) => void;
    ownedResources: IBasicResourcesAmount;
    naturalShelter: boolean;
};

function Construction(props: Props) {
    const resources: JSX.Element[] = [];

    function handleResourceClick(resource: "wood" | "leather") {
        if (props.construction.canResourceBeSwitched && props.construction.committedResources?.type !== resource) {
            props.switchCommittedResources(props.construction.name);
        }
    }


    if (props.construction.committedResources) {
        const resType = props.construction.committedResources.type;
        for (let i = 0; i < props.construction.committedResources?.amount; i++) {
            resources.push(
                <div className={styles.committedResource} key={i}>
                    <ResizableImage
                        src={`/UI/resources/${resType}.png`}
                        fill
                        alt={resType}
                        sizes={styles.committedResource}
                    />
                </div>
            );
        }
    }


    let actionSlots;
    if (props.construction.requiredPawnAmount) {
        actionSlots = getActionSlots(props.construction, props.construction.requiredPawnAmount);
    }

    let constrImgName = props.construction.name as string;

    if (constrImgName === "shelter" && props.construction.lvl === 0 && props.naturalShelter) {
        constrImgName = "natural-shelter";
    }


    return (
        <div
            className={`${styles.construction} ${props.construction.name === "weapon" ? styles.noBottomBorder : ""}`}>
            <div className={styles.lvlLabel}>Poziom {props.construction.lvl}
                {props.construction.temporaryBoost > 0 &&
                    <span className={styles.lvlBoosted}>(+{props.construction.temporaryBoost})</span>
                }
            </div>
            <div className={styles.cost}>

                <CostBlock resource1={props.construction.resourceCost}
                           resource2={props.construction.optionalResourceCost}
                           canBeSwitched={props.construction.canResourceBeSwitched}
                           committedResourceType={props.construction.committedResources?.type || null}
                           onClick={handleResourceClick}
                           ownedResources={props.ownedResources}
                />
            </div>
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
                    props.construction.lvl === 0 && constrImgName !== "natural-shelter" ? styles.level0 : ""
                }`}
            >
                <ResizableImage
                    src={`/UI/constructions/${constrImgName}.png`}
                    fill
                    alt={props.construction.name}
                    sizes={`${styles[props.construction.name]} ${
                        props.construction.lvl === 0 ? styles.level0 : ""
                    }`}
                />
            </div>
            <div className={styles.structureIcon}>
                <ResizableImage
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
