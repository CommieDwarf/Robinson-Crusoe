import React, { useEffect, useState } from "react";
import styles from "./Inventions.module.css";
import scrollbarStyles from "./Scrollbar.module.css";

import Invention from "./Invention/Invention";
import Scrollbar from "../Scrollbar";
import { Scrollbars } from "react-custom-scrollbars";
import Pawn from "../../../../interfaces/Pawn";
import InventionsClass from "../../../../server/Classes/Inventions/Inventions";

interface Props {
  inventions: InventionsClass;
  isBeingDragged: boolean;
  zIndexIncreased: Map<string, boolean>;
  actionSlots: Map<string, Pawn | null>;
}

export default function Inventions(props: Props) {
  const scrollbar = React.createRef<Scrollbars>();
  const [scrollTop, setScrollTop] = useState(0);

  let column = -1;
  let row = -1;
  const starters = props.inventions.inventions.map((invention, i) => {
    column = column == 2 ? 0 : column + 1;
    row = column == 0 ? row + 1 : row;

    const zIndexIncreased = props.zIndexIncreased.get(invention.name);

    return (
      <Invention
        top={scrollTop}
        column={column}
        row={row}
        invention={invention}
        key={i}
        actionSlots={props.actionSlots}
        zIndexIncreased={zIndexIncreased}
      />
    );
  });

  const contentStyle = {
    height: (row + 1) * 140,
  };

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <Scrollbar
        styleModule={scrollbarStyles}
        scrollbarRef={scrollbar}
        setScrollTop={setScrollTop}
        disabled={props.isBeingDragged}
      >
        <div className={styles.content} style={contentStyle}>
          {starters}
        </div>
      </Scrollbar>
    </div>
  );
}
