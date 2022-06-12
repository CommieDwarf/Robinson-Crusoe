import Image from "next/image";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./Character.module.css";
import Helpers from "./Helpers";

import Determination from "./Determination";

export default function Character() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        {/* <Image src="/interface/characters/cook-male.png" layout="fill" alt="character"/> */}
      </div>
      <div className={styles.description}>
        <div className={styles.name}>Kucharz</div>
        <div className={styles.skills}>
          <div className={styles.skill}>
            <span className={styles["skill-description"]}>
              Babcina receptura
            </span>
            <div className={styles["skill-drop-button"]}>
              <div className={styles.triangle}></div>
            </div>
          </div>
          <div className={styles.skill}>
            <span className={styles["skill-description"]}>Bystre oko</span>
            <div className={styles["skill-drop-button"]}>
              <div className={styles.triangle}></div>
            </div>
          </div>

          <div className={styles.skill}>
            <span className={styles["skill-description"]}>Zupa z gwoździa</span>
            <div className={styles["skill-drop-button"]}>
              <div className={styles.triangle}></div>
            </div>
          </div>
          <div className={styles.skill}>
            <span className={styles["skill-description"]}>Samogon</span>
            <div className={styles["skill-drop-button"]}>
              <div className={styles.triangle}></div>
            </div>
          </div>
        </div>
      </div>
      <Determination />
      <Scrollbars
        className={styles.scrollbar}
        // style={scrollbarStyle}
        universal={true}
        hideTracksWhenNotNeeded={true}
        renderTrackHorizontal={(props) => (
          <div {...props} className={styles["track-horizontal"]} />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className={styles["thumb-horizontal"]} />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className={styles["track-vertical"]} />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className={styles["thumb-vertical"]} />
        )}
      >
        <div className={styles.pawns}>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
          <div className={`${styles.pawn} ${styles["cook-male"]}`}></div>
        </div>
      </Scrollbars>
      <Helpers />
    </div>
  );
}
