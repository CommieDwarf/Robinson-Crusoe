import Image from "next/image";
import React, { UIEventHandler, useEffect, useState } from "react";
import styles from "./Map.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import Tile from "./Tile";
import tilePositions from "../../../../utils/tilePositions";
import Scrollbar from "../Scrollbar";
import scrollBarStyle from "./Scrollbar.module.css";
import tileStyles from "./Tile.module.css";
import getDragAndScrollHandle from "../../../../utils/dragAndScrollHandle";

export default function Map() {
  const [contentScale, setContentScale] = useState(100);

  const tiles = tilePositions.map((position, i) => {
    return <Tile position={position} typeId={i} />;
  });

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
      if (target.closest("."+tileStyles.gatherPlayerSlots)) {
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

  return (
    <div
      className={styles.container}
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
          <span className={styles.zoomText} onClick={zoomOut}>-</span>
        </div>
      </div>
      <Scrollbar
        scrollbarRef={scrollbar}
        styleModule={scrollBarStyle}
        contentScale={contentScale}
      >
        <div className={`${styles.content}`} style={contentStyle}>
          <div className={styles.map}>
            <Image src="/interface/map/map.png" layout="fill" alt="map" />
            {tiles}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
