import Image from "next/image";
import React, {useState} from "react";
import ActionSlot from "../../../../ActionSlot";
import styles from "./Invention.module.css";
import getActionSlots from "../../../../getActionSlots";
import {IInventionRenderData} from "../../../../../../../interfaces/InventionService/Invention";
import {getImgName} from "../../../../../../../utils/getImgName";
import {ACTION, ACTION_ITEM} from "../../../../../../../interfaces/ACTION";
import {objectsEqual} from "../../../../../../../utils/objectsEqual";
import {useAppSelector} from "../../../../../../../store/hooks";
import {selectModifiersByAction} from "../../../../../features/globalCostModifiers";

type Props = {
    invention: IInventionRenderData;
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    toggleZoom?: () => void;
    hideActionSlots?: boolean;
};

function Invention(props: Props) {
    const [zoomed, setZoomed] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    function handleLoad() {
        setImageLoaded(true);
    }

    const inventionRef = React.createRef<HTMLDivElement>();

    function handleClick() {
        setZoomed((prev) => !prev);
        if (props.toggleZoom) {
            props.toggleZoom();
        }
    }

    const wrapperStyle = {
        left: props.column * 95,
        top: props.row * 140,
    };

    const enlargedClass = zoomed
        ? styles.inventionEnlarged
        : styles.zIndexTransition;

    wrapperStyle.top = zoomed ? props.top + 3 : wrapperStyle.top;
    wrapperStyle.left = zoomed ? 60 : wrapperStyle.left;

    const resources: JSX.Element[] = [];
    const resource = props.invention.committedResources?.type;
    if (resource && props.invention.committedResources?.amount) {
        for (let i = 0; i < props.invention.committedResources?.amount; i++) {
            resources.push(
                <div className={styles.resource} key={i}>
                    <Image
                        src={`/UI/resources/${resource}.png`}
                        fill
                        alt="surowiec"
                        sizes={styles.resource}
                    />
                </div>
            );
        }

    }

    const leaderId = "invention-" + props.invention.name + "-leader-0";

    const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

    const reverse =
        props.invention.isBuilt && props.invention.inventionType !== "scenario"
            ? "-reverse"
            : "";

    const scenarioBuiltDiv = (
        <div className={styles.scenarioBuilt}>
            <span>Zbudowano</span>
        </div>
    );

    const state = useAppSelector((state) => state.globalCostModifiers);
    const modifiers = selectModifiersByAction(state, ACTION.BUILD);
    const extraPawnNeeded = modifiers.some((mod) => mod.resource === "helper") ? 1 : 0;
    return (
        <div
            ref={inventionRef}
            className={`${styles.invention} ${enlargedClass} ${zIndexClass}`}
            onClick={handleClick}
            style={wrapperStyle}
        >
            <Image
                src={`/UI/inventions/${props.invention.inventionType}/${getImgName(
                    props.invention.name
                )}${reverse}.png`}
                fill
                alt={"karta pomysłu"}
                sizes={styles.invention}
            />
            {
                // <div className={styles.placeholder}>
                //   <Image
                //     src={actionSlotBuildImg}
                //     fill
                //     alt={"loading"}
                //     sizes={styles.placeholder}
                //     placeholder={"blur"}
                //   />
                // </div>
            }
            {!props.invention.isBuilt &&
                !props.invention.locked &&
                !props?.hideActionSlots && (
                    <div className={styles.actionSlots}>
                        {getActionSlots(props.invention, extraPawnNeeded)}
                    </div>
                )}
            {props.invention.inventionType === "scenario" &&
                props.invention.isBuilt &&
                scenarioBuiltDiv}
            <div className={styles.committedResources}>{resources}</div>
        </div>
    );
}

export default React.memo(Invention, objectsEqual);
