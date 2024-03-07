import React from "react";
import ActionSlot from "../../../../ActionSlot";
import styles from "./Invention.module.css";
import getActionSlots from "../../../../getActionSlots";
import {useAppSelector} from "../../../../../../../store/hooks";
import {selectModifiersByAction} from "../../../../../features/globalCostModifiers";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import {kebabCase} from "lodash";
import {emitAction} from "../../../../../../../pages/api/emitAction";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {ACTION} from "@shared/types/Game/ACTION";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";
import {getOwnedDroppableId} from "@shared/utils/getOwnedDroppableId";
import {getPropsComparator} from "../../../../../../../utils/getPropsComparator";

type Props = {
    invention: IInventionRenderData;
    hideActionSlots?: boolean;
    handleMouseOverButtons: (value: boolean) => void;
};

function Invention(props: Props) {

    function handleMouseEnter() {
        props.handleMouseOverButtons(true);
    }

    function handleMouseLeave() {
        props.handleMouseOverButtons(false);
    }


    function handleUseButtonClick() {
        emitAction(OTHER_CONTROLLER_ACTION.USE_INVENTION, {
            inventionName: props.invention.name
        })
        props.handleMouseOverButtons(false);
    }


    const resources: JSX.Element[] = [];
    const resource = props.invention.committedResources?.type;
    if (resource && props.invention.committedResources?.amount) {
        for (let i = 0; i < props.invention.committedResources?.amount; i++) {
            resources.push(
                <div className={styles.resource} key={i}>
                    <ResizableImage
                        src={`/UI/resources/${resource}.png`}
                        alt="surowiec"
                    />
                </div>
            );
        }
    }


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


    return (
        <div
            className={`${styles.container}`}
        >
            <ResizableImage
                src={`/UI/inventions/${props.invention.inventionType}/${kebabCase(
                    props.invention.name
                )}${reverse}.png`}
                alt={"karta pomysłu"}
            />


            {
                // <div className={styles.placeholder}>
                //   <ResizableImage
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

            <div className={`${styles.cardPawn} `}
            >
                {
                    props.invention.pawnService.pawns.map((pawn, i) => {
                        return (
                            <ActionSlot
                                type={"helper"}
                                key={pawn.draggableId}
                                action={ACTION.EXPLORE}
                                uniqueAction={ACTION.EXPLORE}
                                id={getOwnedDroppableId(pawn.owner.name, "invention")}
                                pawn={props.invention.pawnService?.freePawns.find((p) => p.draggableId === pawn.draggableId)}
                                marked={false}
                                ownedByCard={true}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(Invention, getPropsComparator([]));
