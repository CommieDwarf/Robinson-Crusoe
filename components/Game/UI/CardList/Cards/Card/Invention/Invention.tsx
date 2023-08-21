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
import Pawn from "../../../../Pawn";
import {Droppable} from "react-beautiful-dnd";
import {getCardPawnDraggableId} from "../../../../../../../utils/getCardPawnDraggableId";
import {getCardPawnDroppableId} from "../../../../../../../utils/getCardPawnDroppableId";

type Props = {
    invention: IInventionRenderData;
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    toggleZoom?: () => void;
    hideActionSlots?: boolean;

    use: (name: string) => void;

    handleEnlarge: (value: boolean) => void;
    enlarged: boolean;
    handleMouseOverButtons: (value: boolean) => void;
};

function Invention(props: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    function handleLoad() {
        setImageLoaded(true);
    }

    function handleMouseEnter() {
        props.handleMouseOverButtons(true);
    }

    function handleMouseLeave() {
        props.handleMouseOverButtons(false);
    }

    const inventionRef = React.createRef<HTMLDivElement>();

    function handleClick() {
        props.handleEnlarge(!props.enlarged)
    }

    function handleUseButtonClick() {
        props.use(props.invention.name);
        props.handleMouseOverButtons(false);
    }


    const wrapperStyle = {
        left: props.column * 95,
        top: props.row * 140,
    };

    const enlargedClass = props.enlarged
        ? styles.inventionEnlarged
        : styles.zIndexTransition;

    wrapperStyle.top = props.enlarged ? props.top + 3 : wrapperStyle.top;
    wrapperStyle.left = props.enlarged ? 60 : wrapperStyle.left;

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
    const extraPawnNeeded = modifiers.some((mod) => mod.resource === "helper")
        ? 1
        : 0;

    const helperPawn = props.invention.helperPawn;


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
            {props.invention.isBuilt && props.invention.usable &&
                (<div className={styles.useButton} onClick={handleUseButtonClick}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                >
                    Użyj
                </div>)}
            {props.invention.helperPawn && (
                <div className={`${styles.cardPawn} ${zIndexClass}`}
                >
                    <ActionSlot
                        type={"helper"}
                        action={ACTION.EXPLORE}
                        uniqueAction={ACTION.EXPLORE}
                        id={getCardPawnDroppableId(props.invention.name, "invention")}
                        pawn={helperPawn?.pawn}
                        marked={false}
                        ownedByCard={true}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Invention, objectsEqual);
