import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import Scrollbar from "../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import tileStyles from "./Tile/Tile.module.css";
import getDragAndScrollHandle from "../../../../utils/dragAndScrollHandle";
import ITile from "../../../../interfaces/Tiles/Tile";
import Tile from "./Tile/Tile";
import Hunting from "../Hunting/Hunting";
import { IPawn } from "../../../../interfaces/Pawns/Pawn";

interface Props {
  tiles: ITile[];
  actionSlots: Map<string, IPawn | null>;
  zIndexIncreased: Map<string, boolean>;
  scrollDisabled: boolean;
  beastCount: number;
  showScenario: boolean;
}

export default function Map(props: Props) {
  const [contentScale, setContentScale] = useState(100);

  const tiles = [];

  for (let i = 0; i < props.tiles.length; i++) {
    tiles.push(
      <Tile
        tile={props.tiles[i]}
        key={i}
        contentScale={contentScale}
        actionSlots={props.actionSlots}
        zIndexIncreased={props.zIndexIncreased.get(
          props.tiles[i].id.toString()
        )}
        isDragDisabled={props.showScenario}
      />
    );
  }

  const scrollbar = React.createRef<Scrollbars>();
  const container = React.createRef<HTMLDivElement>();

  const mouseDownHandle = getDragAndScrollHandle(scrollbar, container);

  // function handleMouseDown(event: React.MouseEvent) {
  //   const target = event.target as HTMLDivElement;
  //   if (target.closest("." + tileStyles.gatherPlayerSlots)) {
  //     return;
  //   } else {
  //     mouseDownHandle(event);
  //   }
  // }

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

  const zIndexClass = props.zIndexIncreased.get("map")
    ? styles.zIndexIncreased
    : "";
  console.log(props.zIndexIncreased, "z");

  return (
    <div
      className={styles.container + " " + zIndexClass}
      ref={container}
      onMouseDown={mouseDownHandle}
    >
      <div className={styles.zoom}>
        <div className={styles.zoomIcon}>
          <Image
            src="/interface/map/magnifying-glass.png"
            layout="fill"
            alt="zoom"
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
      <Hunting
        actionSlots={props.actionSlots}
        zIndexIncreased={props.zIndexIncreased.get("hunting")}
        beastCount={props.beastCount}
        isDragDisabled={props.showScenario}
      />
      <Scrollbar
        scrollbarRef={scrollbar}
        styleModule={scrollbarStyles}
        contentScale={contentScale}
        disabled={props.scrollDisabled}
      >
        <div className={`${styles.content}`} style={contentStyle}>
          <div className={styles.map}>
            <Image
              src="/interface/map/map.png"
              layout="fill"
              alt="map"
              priority
            />
            {tiles}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
