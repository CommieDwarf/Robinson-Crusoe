import React, { useState } from "react";
import styles from "./Inventions.module.css";
import scrollbarStyles from "./Scrollbar.module.css";

import Invention from "./Invention/Invention";
import Scrollbar from "../Scrollbar";
import { IInventionRenderData } from "../../../../interfaces/InventionService/Invention";
import { objectsEqual } from "../../../../utils/objectsEqual";
import { sleep } from "../../../../utils/sleep";

interface Props {
  inventions: IInventionRenderData[];
  isBeingDragged: boolean;
  zIndex: string;
}

function Inventions(props: Props) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  let column = -1;
  let row = -1;
  const starters = props.inventions.map((invention, i) => {
    column = column == 2 ? 0 : column + 1;
    row = column == 0 ? row + 1 : row;
    return (
      <Invention
        top={scrollTop}
        column={column}
        row={row}
        invention={invention}
        key={invention.name}
        zIndexIncreased={props.zIndex.includes(invention.name)}
        setIsEnlarged={setIsEnlarged}
      />
    );
  });

  const contentStyle = {
    height: (row + 1) * 140,
  };

  const zIndexClass = props.zIndex.includes("invention")
    ? styles.zIndexIncreased
    : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <Scrollbar
        styleModule={scrollbarStyles}
        setScrollTop={setScrollTop}
        disabled={props.isBeingDragged && isEnlarged}
      >
        <div className={styles.content} style={contentStyle}>
          {starters}
        </div>
      </Scrollbar>
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props) {
  const start = Date.now();
  let equal = objectsEqual(prevProps, nextProps);
  const end = Date.now();
  console.log("Inventions", end - start);
  return equal;
}

export default React.memo(Inventions, areEqual);
