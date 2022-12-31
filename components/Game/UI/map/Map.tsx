import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import Scrollbar from "../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import tileStyles from "./Tile/Tile.module.css";
import getDragAndScrollHandle from "../../../../utils/dragAndScrollHandle";
import Tile from "./Tile/Tile";
import Hunt from "../Hunt/Hunt";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { ITileRenderData } from "../../../../interfaces/TileService/ITile";
import { ITilesServiceRenderData } from "../../../../interfaces/TileService/ITileService";
import magnifyingGlass from "/public/UI/map/magnifying-glass.png";
import map from "/public/UI/map/map.png";

interface Props {
  tileService: ITilesServiceRenderData;
  actionSlots: Map<string, IPawnRenderData | null>;
  scrollDisabled: boolean;
  beastCount: number;
  showScenario: boolean;
  zIndex: string;
  night: boolean;
  showCampMoveConfirm: (tile: ITileRenderData) => void;
}

export default function Map(props: Props) {
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
        actionSlots={props.actionSlots}
        isDragDisabled={props.showScenario}
        zIndex={props.zIndex}
        showCampMoveConfirm={props.showCampMoveConfirm}
        campSettableTiles={
          tile.camp && !props.tileService.campJustMoved ? campSettableTiles : []
        }
      />
    );
  });

  const scrollbar = useRef<Scrollbars>(null);
  const container = useRef<HTMLDivElement>(null);

  const mouseDownHandle = getDragAndScrollHandle(scrollbar, container);

  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      const target = event.target as HTMLDivElement;
      const actionSlotsScrollable = target.closest(
        "." + tileStyles.gatherActionSlotsScrollable
      );

      if (actionSlotsScrollable) {
        return;
      }

      event.preventDefault();
      if (event.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }

    const element = container.current;
    element?.addEventListener("wheel", handleWheel, { passive: false });

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

  const zIndexClass = props.zIndex.includes("tile")
    ? styles.zIndexIncreased
    : "";

  return (
    <div
      className={styles.container + " " + zIndexClass}
      ref={container}
      onMouseDown={mouseDownHandle}
    >
      <div className={styles.zoom}>
        <div className={styles.zoomIcon}>
          <Image
            src={magnifyingGlass}
            fill
            alt="zoom"
            sizes={styles.zoomIcon}
          />
        </div>
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
        actionSlots={props.actionSlots}
        beastCount={props.beastCount}
        isDragDisabled={props.showScenario}
        zIndex={props.zIndex}
      />
      <Scrollbar
        scrollbarRef={scrollbar}
        styleModule={scrollbarStyles}
        contentScale={contentScale}
        disabled={props.scrollDisabled}
      >
        <div className={`${styles.content}`} style={contentStyle}>
          <div className={styles.map}>
            <Image src={map} fill alt="mapa" priority sizes={styles.map} />
            {tiles}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
