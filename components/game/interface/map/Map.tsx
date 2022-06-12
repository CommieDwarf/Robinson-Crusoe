import Image from "next/image";
import React, { useState } from "react";
import styles from "./Map.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import DragAndScroll from "../../../../utils/dragAndScroll";
import Tile from "./Tile";
import tilePositions from "./tilePositions";
import Scrollbar from "../Scrollbar";
import scrollBarStyle from "./Scrollbar.module.css";

console.log(scrollBarStyle)
export default function Map() {


  const [zoom, setZoom] = useState(1);

  function zoomIn() {
    if (zoom < 4) {
      setZoom((prev) => {
        return ++prev;
      })
    }

  }

  function zoomOut() {
    if (zoom > 1) {
      setZoom((prev) => {
        return --prev;
      })
    }
  }

  const tiles = tilePositions.map((position) => {
    return <Tile position={position} typeId={11} />
  })

  
 

const zoomClass = "zoom" + zoom;

const scrollbar = React.createRef<Scrollbars>();
const container = React.createRef<HTMLDivElement>();

const dragAndScroll = new DragAndScroll(scrollbar, container);

  return (
    <div className={styles.container} ref={container} onMouseDown={dragAndScroll.handleMouseDown}>
      <div className={styles.zoom}>
            <div className={styles.zoomIcon}>
              <Image
                src="/interface/map/magnifying-glass.png"
                layout="fill"
                alt="zoom"
              />
            </div>
            <div className={styles.zoomButton} onClick={zoomIn}><span className={styles.zoomText}>+</span></div>
            <div className={styles.zoomButton} onClick={zoomOut}><span className={styles.zoomText}>-</span></div>
          </div>
        <Scrollbar scrollbarRef={scrollbar} styleModule={scrollBarStyle} >
          <div className={`${styles.content} ${styles[zoomClass]}`}>
            <div className={styles.map}>
              <Image src="/interface/map/map.png" layout="fill" alt="map" />
              {tiles}
            </div>
          </div>
        </Scrollbar>
    </div>
  );
}
