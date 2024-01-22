import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Tile.module.css";
import {ITileRenderData} from "../../../../../interfaces/TileService/ITile";
import {MoveCampArrow} from "./MoveCampArrow/MoveCampArrow";
import {ACTION, ACTION_ITEM} from "../../../../../interfaces/ACTION";
import {getDroppableID,} from "../../../../../utils/getDroppableID";

import xMarkImg from "/public/UI/misc/x-mark.png";
import greaterDangerToken from "/public/UI/tokens/greater-danger.png"
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png"

import {ResourceActionButton} from "./ResourceActionButton/ResourceActionButton";
import getActionSlots from "../../getActionSlots";

interface Props {
    tile: ITileRenderData;
    contentScale: number;
    isDragDisabled: boolean;
    zIndex: string;
    campSettableTiles: ITileRenderData[];
    showCampMoveConfirm: (tile: ITileRenderData) => void;
    triggerTileResourceAction: (tileID: number, side: "left" | "right") => void;
    triggerTileAction: (tileID: number) => void;
}

export default function Tile(props: Props) {
    let style = {
        top: props.tile.position.cords.top + "%",
        left: props.tile.position.cords.left + "%",
    };

    let actionSlots;
    let preventMapScrollClass =
        props.tile.requiredPawnAmount !== null && props.tile.requiredPawnAmount >= 1 && props.tile.tileResourceService
            ? "preventMapScroll"
            : "";
    if (props.tile.requiredPawnAmount === null) {
        actionSlots = <div></div>
    } else if (!props.tile.tileResourceService && !props.tile.modifiers.flipped) {
        actionSlots = (
            <div className={`${styles.explorePlayerSlots}`}>
                {getActionSlots(props.tile, props.tile.requiredPawnAmount).map((slot, i) => {
                    return <div className={styles.actionSlot} key={i}>{slot}</div>
                })}
            </div>
        );
    } else if (!props.tile.modifiers.flipped && props.tile.tileResourceService) {
        actionSlots = (
            <div className={`${styles.scroll} ${preventMapScrollClass}`}>
                <div
                    className={`${styles.gatherActionSlots}${
                        props.tile.requiredPawnAmount <= 1
                            ? styles.gatherActionSlotsFew
                            : ""
                    }`}
                >
                    {props.tile.tileResourceService.resources.left.resource !== "beast" &&
                        !props.tile.tileResourceService.resources.left.depleted && (
                            <div className={styles.gatherActionSlotsLeft}>
                                {getActionSlots(props.tile, props.tile.requiredPawnAmount, "left").map((slot, i) => {
                                    return <div className={styles.actionSlotGather} key={i}>{slot}</div>
                                })
                                }
                            </div>
                        )}
                    {props.tile.tileResourceService.resources.right.resource !==
                        "beast" &&
                        !props.tile.tileResourceService.resources.right.depleted && (
                            <div className={styles.gatherActionSlotsRight}>
                                {getActionSlots(props.tile, props.tile.requiredPawnAmount, "right").map((slot, i) => {
                                    return <div className={styles.actionSlotGather} key={i}>{slot}</div>
                                })}
                            </div>
                        )}
                </div>
            </div>
        );
    }

    const imgId =
        props.tile.tileResourceService == null || props.tile.modifiers.flipped
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

    const flippedClass = props.tile.modifiers.flipped ? styles.flipped : "";
    const resourceModifierLeft = props.tile.tileResourceService?.resources.left.modifiers[0];
    const resourceModifierRight = props.tile.tileResourceService?.resources.right.modifiers[0];

    return (
        <div className={`${styles.container} ${zIndexClass} ${flippedClass}`} style={style}>
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
                        <ResourceActionButton
                            side={"right"}
                            tileID={props.tile.id}
                            triggerResourceAction={props.triggerTileResourceAction}
                        />
                    )}
                    {props.tile.tileResourceService?.resources.left
                        .markedForAction && (
                        <ResourceActionButton
                            side={"left"}
                            tileID={props.tile.id}
                            triggerResourceAction={props.triggerTileResourceAction}
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
                    {resourceModifierLeft &&
                        <div className={`${styles.resourceModifier} ${styles.resourceModifierLeft}`}>
                            <Image src={`/UI/tokens/modifiers/${resourceModifierLeft.resource}.png`}
                                   alt={"dodatkowy zasób"} fill/>
                        </div>
                    }
                    {resourceModifierRight &&
                        <div className={`${styles.resourceModifier} ${styles.resourceModifierRight}`}>
                            <Image src={`/UI/tokens/modifiers/${resourceModifierRight.resource}.png`}
                                   alt={"dodatkowy zasób"} fill/>
                        </div>
                    }
                </>
            )}
        </div>
    );
}
