import {IConstructionRenderData} from "@shared/types/Game/ConstructionService/Construction";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";
import {emitAction} from "../../../../../pages/api/emitAction";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import getActionSlots from "../../getActionSlots";
import {objectsEqual} from "@shared/utils/objectsEqual";
import styles from "./Construction.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {CostBlock} from "./CostBlock/CostBlock";
import React from "react";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";


type Props = {
    construction: IConstructionRenderData;
    hideActionSlots?: boolean;
    ownedResources: IBasicResourcesAmount;
    naturalShelter: boolean;
};

function Construction(props: Props) {
    const resources: JSX.Element[] = [];

    function handleResourceClick(resource: "wood" | "leather") {
        if (props.construction.canResourceBeSwitched && props.construction.committedResources?.type !== resource) {
            emitAction(OTHER_CONTROLLER_ACTION.SWITCH_COMMITTED_RESOURCES_TYPE, props.construction.name)
        }
    }

    const {t} = useTranslation()


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
            <div className={styles.lvlLabel}>{capitalize(t("other.level"))} {props.construction.lvl}
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
                />
            </div>
            <div className={styles.structureIcon}>
                <ResizableImage
                    src={`/UI/constructions/${props.construction.name}-icon.png`}
                    fill
                    alt={props.construction.name + " icon"}
                />
            </div>
        </div>
    );
}

function areEqual(prevProps: Props, nextProps: Props) {
    return objectsEqual(prevProps, nextProps);
}

export default React.memo(Construction, areEqual);
