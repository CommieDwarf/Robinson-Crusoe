// @flow
import * as React from "react";
import styles from "./Adventure.module.css";
import Draggable from "react-draggable";
import Image from "next/image";
import {useState} from "react";
import magnifyingGlassImg from "/public/UI/map/magnifying-glass.png";

type Props = {};
export const Adventure = (props: Props) => {
  const [enlarged, setEnlarged] = useState(false);

  function handleZoomClick() {
    setEnlarged((state) => !state);
  }

  return (
      <Draggable bounds={"parent"}>
        <div className={styles.container}>
          <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
            <div className={styles.zoomButton} onClick={handleZoomClick}>
              <div className={styles.magnifyingGlass}>
                <Image
                    src={magnifyingGlassImg}
                    alt={"powiększ"}
                    sizes={styles.magnifyingGlass}
                    fill
                    unselectable={"on"}
                    draggable={"false"}
                />
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.action}>Wtasuj</div>
              <div className={styles.action}>Odrzuć</div>
            </div>
            <Image
                src={"/UI/cards/adventure/build/coming-to-terms.png"}
                alt={"karta przygody"}
                fill
                sizes={styles.card}
                unselectable={"on"}
                draggable={"false"}
            />
          </div>

        </div>
      </Draggable>
  );
};
