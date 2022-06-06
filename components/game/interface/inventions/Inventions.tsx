import React from "react";
import styles from "./Inventions.module.css";
import { Scrollbars } from "react-custom-scrollbars";

import * as cards from "./inventionList";
import Invention from "./Invention";

export default function Inventions() {
  const starters = cards.starters.map((card, i) => {
    let locked = false;
    if (i == 1) {
      locked = true;
    }
    return <Invention name={card} type={"starter"} key={i} locked={locked} />;
  });

  const scrollbarStyle = {
    width: "100%",
    height: "100%",
    "grid-column": "6 / span 1",
    "grid-row": "1 / span 2",
  };

  return (
    <Scrollbars
      className={styles.scrollbar}
      // style={scrollbarStyle}
      universal={true}
      renderTrackHorizontal={props => <div {...props} className={styles["track-horizontal"]}/>}
        renderThumbHorizontal={props => <div {...props} className={styles["thumb-horizontal"]}/>}
        renderTrackVertical={props => <div {...props} className={styles["track-vertical"]}/>}
        renderThumbVertical={props => <div {...props} className={styles["thumb-vertical"]}/>}
    >
      <div className={styles.container}>{starters}</div>
      
      
    </Scrollbars>
  );
}
