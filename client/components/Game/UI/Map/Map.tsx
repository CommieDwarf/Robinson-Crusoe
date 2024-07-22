import React, {RefObject, useEffect, useRef, useState} from "react";
import styles from "./Map.module.css";
import Tile from "./Tile/Tile";
import BeastDeck from "../Hunt/BeastDeck";
import map from "/public/UI/map/map.png";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {getObjectsComparator} from "../../../../utils/getObjectsComparator";
import getMouseDownHandle from "../../../../utils/dragAndScrollHandle";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
    scrollDisabled: boolean;
    showScenario: boolean;
    topLayerElement: string;
    showCampMoveConfirm: (tile: ITileRenderData) => void;
    mapContainerRef: RefObject<HTMLDivElement>
}

function Map(props: Props) {
    const [contentScale, setContentScale] = useState(100);
    const tileService = useAppSelector((state) => selectGame(state).tileService!);

    const tiles: JSX.Element[] = [];
    const campSettableTiles = tileService.tiles.filter(
        (tile) => tile.canCampBeSettled
    );

    tileService.tiles.forEach((tile, i) => {
        tiles.push(
            <Tile
                tile={tile}
                key={i}
                contentScale={contentScale}
                isDragDisabled={props.showScenario}
                zIndex={props.topLayerElement}
                showCampMoveConfirm={props.showCampMoveConfirm}
                campSettableTiles={
                    tile.camp && !tileService.campJustMoved ? campSettableTiles : []
                }
            />
        );
    });

    const scrollbar = useRef<HTMLDivElement>(null);
    const container = props.mapContainerRef

    const mouseDownHandle = getMouseDownHandle(scrollbar, container);


    useEffect(() => {
        function handleWheel(event: WheelEvent) {
            const target = event.target as HTMLDivElement;
            const actionSlotsScrollable = target.closest(
                ".preventMapScroll"
            );
            if (actionSlotsScrollable || props.scrollDisabled) {
                return false
            }
            event.preventDefault();


            if (event.deltaY < 0) {
                zoomIn();
                if (scrollbar.current) {
                    scrollbar.current.scrollBy({
                        left: 60,
                        top: 60,
                        behavior: "smooth"
                    })
                }
            } else {
                zoomOut();
                if (scrollbar.current) {
                    scrollbar.current.scrollBy({
                        left: -60,
                        top: -60,
                        behavior: "smooth"
                    })
                }
            }
            return false;
        }

        const element = container.current;
        element?.addEventListener("wheel", handleWheel, {passive: false});

        return () => {
            element?.removeEventListener("wheel", handleWheel);
        };
    });

    function zoomIn() {

        setContentScale((prev) => {
            if (prev < 300) {
                return prev + 15;
            } else {
                return prev;
            }
        });
    }

    function zoomOut() {
        setContentScale((prev) => {
            if (prev > 100) {
                return prev - 15;
            } else {
                return prev;
            }
        });
    }

    const contentStyle = {
        width: contentScale + "%",
        height: contentScale + "%",
    };

    const zIndexClass =
        props.topLayerElement.includes("tile") ||
        tileService.isTileMarkedForAction
            ? styles.zIndexIncreased
            : "";

    const scrollDisabledClass = props.scrollDisabled ? styles.scrollDisabled : "";


    return (
        <div
            className={`${styles.container} ${zIndexClass}`}
            ref={container}
            onMouseDown={mouseDownHandle}
        >
            {tileService.isTileMarkedForAction && (
                <div className={styles.tipArrow}>
                    <ResizableImage
                        src={redArrowImg}
                        alt={""}
                        fill
                        sizes={styles.tipArrow}
                    />
                </div>
            )}
            <div className={styles.zoom}>
                <div className={styles.zoomButton} onClick={zoomIn}>
                    <span className={styles.zoomText}>+</span>
                </div>
                <div className={styles.zoomButton}>
          <span className={styles.zoomText} onClick={zoomOut}>
            -
          </span>
                </div>
            </div>
            <BeastDeck
                isDragDisabled={props.showScenario}
                topLayer={props.topLayerElement.includes("hunt")}
            />
            <div className={`${styles.scroll} ${scrollDisabledClass}`} ref={scrollbar}>
                <div className={`${styles.content}`} style={contentStyle}>
                    <div className={styles.map}>
                        <ResizableImage src={map} alt="mapa"/>
                        {tiles}
                    </div>
                </div>
            </div>

        </div>
    );
}


export default React.memo(Map, getObjectsComparator([]));
