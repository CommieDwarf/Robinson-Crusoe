import React, { useRef, useState } from "react";
import styles from "./Inventions.module.css";
import scrollbarStyles from "./Scrollbar.module.css";

import Invention from "./Invention/Invention";
import Scrollbar from "../Scrollbar";
import { Scrollbars } from "react-custom-scrollbars";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { IInventionRenderData } from "../../../../interfaces/Inventions/Invention";

interface Props {
  inventions: IInventionRenderData[];
  isBeingDragged: boolean;
  zIndex: string;
  actionSlots: Map<string, IPawnRenderData | null>;
}

export default function Inventions(props: Props) {
  const scrollbarRef = useRef<Scrollbars>(null);
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
        key={i}
        actionSlots={props.actionSlots}
        zIndex={props.zIndex}
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
        scrollbarRef={scrollbarRef}
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
