// @flow
import * as React from "react";
import styles from "./Adventure.module.css";
import Draggable from "react-draggable";
import Image from "next/image";
import { useState } from "react";
import magnifyingGlassImg from "/public/UI/map/magnifying-glass.png";
import { IAdventureCardRenderData } from "../../../../interfaces/AdventureService/AdventureCard";
import { objectsEqual } from "../../../../utils/objectsEqual";
import { getImgName } from "../../../../utils/getImgName";
import i18n from "../../../../I18n/I18n";

type Props = {
  card: IAdventureCardRenderData;
  resolve: (option: 1 | 2) => void;
};
const Adventure = (props: Props) => {
  const [enlarged, setEnlarged] = useState(false);

  function handleZoomClick() {
    setEnlarged((state) => !state);
  }

  function handleOption1Click() {
    props.resolve(1);
  }

  function handleOption2Click() {
    props.resolve(2);
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
          <div className={styles.actions} onClick={handleOption1Click}>
            <div className={styles.action}>
              {i18n.t(`adventureOptionLabel.${props.card.option1Label}`)}
            </div>
            {props.card.shouldDecide && (
              <div
                className={styles.action}
                onClick={handleOption2Click}
              >{`adventureOptionLabel.${props.card.option2Label}`}</div>
            )}
          </div>
          <Image
            src={`/UI/cards/adventure/${props.card.action}/${getImgName(
              props.card.name
            )}.png`}
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

export default React.memo(Adventure, objectsEqual);
