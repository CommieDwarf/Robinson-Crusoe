import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Tile.module.css";
import {ITileRenderData} from "../../../../../interfaces/TileService/ITile";
import {MoveCampArrow} from "./MoveCampArrow/MoveCampArrow";
import {ACTION} from "../../../../../interfaces/ACTION";
import {
    ACTION_ITEM,
    getDroppableID,
} from "../../../../../utils/getDroppableID";

import xMarkImg from "/public/UI/misc/x-mark.png";
import greaterDangerToken from "/public/UI/tokens/greater-danger.png"
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png"

import {ResourceDepletionButton} from "./ResourceDepletionButton/ResourceDepletionButton";
import {reverseSide} from "../../../../../utils/reverseSide";

interface Props {
    tile: ITileRenderData;
    contentScale: number;
    isDragDisabled: boolean;
    zIndex: string;
    campSettableTiles: ITileRenderData[];
    showCampMoveConfirm: (tile: ITileRenderData) => void;
    depleteResource: (tileID: number, side: "left" | "right") => void;
    triggerTileAction: (tileID: number) => void;
}

export default function Tile(props: Props) {
    let style = {
        top: props.tile.position.cords.top + "%",
        left: props.tile.position.cords.left + "%",
    };


    function getActionSlots(
        action: ACTION.GATHER | ACTION.EXPLORE,
        side: "left" | "right" | "",
    ): JSX.Element[] {
        const pawnAmountModifier = props.tile.modifiers.timeConsumingAction && side && props.tile.requiredPawnsSatisfied[reverseSide(side)] ? -1 : 0;
        const actionSlots = [];
        const context =
            action === ACTION.GATHER ? ACTION_ITEM.GATHER : ACTION_ITEM.EXPLORE;
        for (let i = 0; i < props.tile.requiredHelperAmount + 1 + pawnAmountModifier; i++) {
            const id = getDroppableID(context, props.tile.id, side, i + 1);

            actionSlots.push(
                <ActionSlot
                    type={"helper"}
                    action={action}
                    actionItem={context}
                    id={id}
                    key={id}
                    isDragDisabled={props.isDragDisabled}
                />
            );
        }

        const id = getDroppableID(context, props.tile.id, side, 0);

        actionSlots.unshift(
            <ActionSlot
                type={"leader"}
                action={action}
                actionItem={context}
                id={id}
                key={id}
                isDragDisabled={props.isDragDisabled}
            />
        );
        return actionSlots;
    }

    let actionSlots;
    let preventMapScrollClass =
        props.tile.requiredHelperAmount >= 1 && props.tile.tileResourceService
            ? "preventMapScroll"
            : "";

    if (!props.tile.tileResourceService) {
        actionSlots = (
            <div className={styles.explorePlayerSlots}>
                {getActionSlots(ACTION.EXPLORE, "")}
            </div>
        );
    } else {


        actionSlots = (
            <div className={`${styles.scroll} ${preventMapScrollClass}`}>
                <div
                    className={`${styles.gatherActionSlots}${
                        props.tile.requiredHelperAmount <= 1
                            ? styles.gatherActionSlotsFew
                            : ""
                    }`}
                >
                    {props.tile.tileResourceService.resources.left.resource !== "beast" &&
                        !props.tile.tileResourceService.resources.left.depleted && (
                            <div className={styles.gatherActionSlotsLeft}>
                                {getActionSlots(ACTION.GATHER, "left")}
                            </div>
                        )}
                    {props.tile.tileResourceService.resources.right.resource !==
                        "beast" &&
                        !props.tile.tileResourceService.resources.right.depleted && (
                            <div className={styles.gatherActionSlotsRight}>
                                {getActionSlots(ACTION.GATHER, "right")}
                            </div>
                        )}
                </div>
            </div>
        );
    }

    const imgId =
        props.tile.tileResourceService == null
            ? 11
            : props.tile.tileResourceService.id;

    const zIndexClass =
        props.zIndex.includes("tile") &&
        props.zIndex.includes("-" + props.tile.id + "-")
            ? styles.zIndexIncreased
            : "";

    const arrows = props.campSettableTiles.map((tile, i) => {
        return (
            <MoveCampArrow
                tile={tile}
                campTile={props.tile}
                key={i}
                showCampMoveConfirm={props.showCampMoveConfirm}
            />
        );
    });

    function handleTileMarkClick() {
        props.triggerTileAction(props.tile.id);
    }


    return (
        <div className={`${styles.container} ${zIndexClass}`} style={style}>
            {arrows}
            {props.tile.show && (
                <>
                    <div className={styles.tile}>
                        <Image
                            src={`/UI/map/tiles/${imgId}.png`}
                            fill
                            alt="kafelek"
                            sizes={styles.tile}
                        />
                    </div>
                    {!props.tile.camp && actionSlots}
                    {props.tile.camp && (
                        <div className={styles.campIcon}>
                            <Image
                                src={"/UI/tokens/camp.png"}
                                fill
                                alt={"obóz"}
                                sizes={styles.campIcon}
                            />
                        </div>
                    )}
                    {props.tile.tileResourceService?.resources.left.depleted && (
                        <div
                            className={`${styles.depletedMark} ${styles.depletedMarkLeft}`}
                        >
                            <Image
                                src={xMarkImg}
                                alt={"źródło wyczerpane"}
                                fill
                                sizes={styles.xMark}
                            />
                        </div>
                    )}
                    {props.tile.tileResourceService?.resources.right.depleted && (
                        <div
                            className={`${styles.depletedMark} ${styles.depletedMarkRight}`}
                        >
                            <Image
                                src={xMarkImg}
                                alt={"źródło wyczerpane"}
                                fill
                                sizes={styles.xMark}
                            />
                        </div>
                    )}
                    {props.tile.tileResourceService?.resources.right
                        .markedForAction && (
                        <ResourceDepletionButton
                            side={"right"}
                            tileID={props.tile.id}
                            depleteResource={props.depleteResource}
                        />
                    )}
                    {props.tile.tileResourceService?.resources.left
                        .markedForAction && (
                        <ResourceDepletionButton
                            side={"left"}
                            tileID={props.tile.id}
                            depleteResource={props.depleteResource}
                        />
                    )}
                    {props.tile.markedForAction &&
                        <div className={styles.markedForAction} onClick={handleTileMarkClick}></div>}
                    <div className={styles.modifiers}>
                        {props.tile.modifiers.greaterDanger && <div className={styles.modifier}>
                            <Image src={greaterDangerToken} alt={"zagrożenie"} fill/>
                        </div>}
                        {props.tile.modifiers.timeConsumingAction &&
                            <div className={styles.modifier}>
                                <Image src={timeConsumingActionToken} alt={"zagrożenie"} fill/>
                            </div>
                        }
                    </div>
                    {props.tile.modifiers.terrainDepleted && <div className={styles.terrainDepleted}>
                        <Image src={xMarkImg} fill alt={"teren zakryty"}/>
                    </div>}
                </>
            )}
        </div>
    );
}
