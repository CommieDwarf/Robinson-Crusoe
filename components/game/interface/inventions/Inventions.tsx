import React, { useEffect, useState } from "react";
import styles from "./Inventions.module.css";
import scrollbarStyles from "./Scrollbar.module.css";

import Invention from "./Invention/Invention";
import Scrollbar from "../Scrollbar";
import { Scrollbars } from "react-custom-scrollbars";
import IInvention from "../../../../interfaces/Invention";


interface Props {
  inventions: IInvention[],
}

export default function Inventions(props: Props) {

  const scrollbar = React.createRef<Scrollbars>();
  const [scrollTop, setScrollTop] = useState(0);



  let column = -1;
  let row = -1;
  const starters = props.inventions.map((invention, i) => {
    column = column == 2 ? 0: column + 1;
    row = column == 0 ? row + 1 : row;
    
    return <Invention top={scrollTop} column={column} row={row} name={invention.name} type={invention.type} key={i} locked={invention.locked} />;
  });


  const contentStyle = {
    height: (row + 1) * 140,
  }

  console.log(starters.length)

  return (
    <div className={styles.container}>
      <Scrollbar styleModule={scrollbarStyles} scrollbarRef={scrollbar} setScrollTop={setScrollTop}>
        <div className={styles.content} style={contentStyle}>{starters}</div>
      </Scrollbar>
    </div>
  );
}
