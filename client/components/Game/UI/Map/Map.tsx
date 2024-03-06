import React, {RefObject, useEffect, useRef, useState} from "react";
import styles from "./Map.module.css";
import Tile from "./Tile/Tile";
import Hunt from "../Hunt/Hunt";
import map from "/public/UI/map/map.png";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {arePropsEqual} from "../../../../utils/arePropsEqual";
import {ITilesServiceRenderData} from "@shared/types/Game/TileService/ITileService";
import getMouseDownHandle from "../../../../utils/dragAndScrollHandle";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";

interface Props {
    tileService: ITilesServiceRenderData;
    scrollDisabled: boolean;
    beastCount: number;
    showScenario: boolean;
    zIndex: string;
    night: boolean;
    showCampMoveConfirm: (tile: ITileRenderData) => void;
    containerRef: RefObject<HTMLDivElement>
}

function Map(props: Props) {
    const [contentScale, setContentScale] = useState(100);
    const tiles: JSX.Element[] = [];

    const campSettableTiles = props.tileService.tiles.filter(
        (tile) => tile.canCampBeSettled
    );

    props.tileService.tiles.forEach((tile, i) => {
        tiles.push(
            <Tile
                tile={tile}
                key={i}
                contentScale={contentScale}
                isDragDisabled={props.showScenario}
                zIndex={props.zIndex}
                showCampMoveConfirm={props.showCampMoveConfirm}
                campSettableTiles={
                    tile.camp && !props.tileService.campJustMoved ? campSettableTiles : []
                }
            />
        );
    });

    const scrollbar = useRef<HTMLDivElement>(null);
    const container = props.containerRef

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
        props.zIndex.includes("tile") ||
        props.tileService.isTileMarkedForAction
            ? styles.zIndexIncreased
            : "";

    const scrollDisabledClass = props.scrollDisabled ? styles.scrollDisabled : "";


    return (
        <div
            className={`${styles.container} ${zIndexClass}`}
            ref={container}
            onMouseDown={mouseDownHandle}
        >
            {props.tileService.isTileMarkedForAction && (
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
            <Hunt
                beastCount={props.beastCount}
                isDragDisabled={props.showScenario}
                zIndex={props.zIndex}
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


export default React.memo(Map, arePropsEqual([]));
