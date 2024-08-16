import React from "react";
import styles from "./Tile.module.css";
import {MoveCampArrow} from "./MoveCampArrow/MoveCampArrow";


import {ResourceActionButton} from "./ResourceModifiers/ResourceActionButton/ResourceActionButton";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {TILE_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {socketEmitAction} from "../../../../../middleware/socketMiddleware";
import {selectGame} from "../../../../../reduxSlices/gameSession";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ActionSlots} from "./ActionSlots/ActionSlots";
import {ResourceDepleted} from "./ResourceModifiers/ResourceDepleted/ResourceDepleted";
import {TileModifier} from "./TileModifier/TileModifier";
import {ResourceModifier} from "./ResourceModifiers/ResourceModifier/ResourceModifier";
import {Shortcut} from "./ResourceModifiers/Shortcut/Shortcut";
import {ResourceModifiers} from "./ResourceModifiers/ResourceModifiers";

interface Props {
    tile: ITileRenderData;
    contentScale: number;
    isDragDisabled: boolean;
    zIndex: string;
    campSettableTiles: ITileRenderData[];
    showCampMoveConfirm: (tile: ITileRenderData) => void;
}

export default function Tile(props: Props) {


    const dispatch = useAppDispatch();
    const shelterBuilt = useAppSelector(state =>
        selectGame(state)?.constructionService.constructions
            .find((construction) => construction.name === CONSTRUCTION.SHELTER)?.lvl === 1)

    let style = {
        top: props.tile.position.cords.top + "%",
        left: props.tile.position.cords.left + "%",
    };


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
        dispatch(socketEmitAction(TILE_CONTROLLER_ACTION.TRIGGER_TILE_ACTION, props.tile.id));
    }

    const flippedClass = props.tile.modifiers.flipped ? styles.flipped : "";
    const resourceModifierLeft = props.tile.tileResourceService?.resources.left.modifiers[0];
    const resourceModifierRight = props.tile.tileResourceService?.resources.right.modifiers[0];


    const resources = props.tile.tileResourceService?.resources;

    return (
        <div className={`${styles.container} ${zIndexClass} ${flippedClass}`} style={style}>
            {arrows}
            {props.tile.show && (
                <>
                    <div className={styles.tile}>
                        <ResizableImage src={`/UI/map/tiles/${imgId}.png`} alt={"kafelek"}/>
                    </div>

                    {!props.tile.camp &&
                        <ActionSlots tile={props.tile}/>
                    }


                    {props.tile.camp && (
                        <div className={styles.campIcon}>
                            <ResizableImage
                                src={`/UI/tokens/${shelterBuilt ? "shelter" : "camp"}.png`}
                                fill
                                alt={"obóz"}
                            />
                        </div>
                    )}
                    {props.tile.markedForAction &&
                        <div className={styles.markedForAction} onClick={handleTileMarkClick}></div>}
                    <div className={styles.modifiers}>
                        {props.tile.modifiers.greaterDanger && <div className={styles.modifier}>
                            <TileModifier type={"greaterDanger"}/>
                        </div>}
                        {props.tile.modifiers.timeConsumingAction &&
                            <TileModifier type={"timeConsumingAction"}/>
                        }
                    </div>
                    {props.tile.modifiers.terrainDepleted &&
                        <TileModifier type={"terrainDepleted"}/>
                    }
                    {resources?.left &&
                        <ResourceModifiers resourceInfo={resources.left} side={"left"} tileId={props.tile.id}/>
                    }
                    {resources?.right &&
                        <ResourceModifiers resourceInfo={resources.right} side={"right"} tileId={props.tile.id}/>
                    }
                </>
            )}
        </div>
    );
}
