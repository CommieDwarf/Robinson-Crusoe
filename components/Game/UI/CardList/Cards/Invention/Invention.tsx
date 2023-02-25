import Image from "next/image";
import React, { useState } from "react";
import ActionSlot from "../../../ActionSlot";
import styles from "./Invention.module.css";
import getHelperActionSlots from "../../../../../../utils/getHelperActionSlots";
import { IInventionRenderData } from "../../../../../../interfaces/InventionService/Invention";
import { getImgName } from "../../../../../../utils/getImgName";
import { ACTION } from "../../../../../../interfaces/ACTION";
import { ACTION_ITEM } from "../../../../../../utils/getDroppableID";
import { objectsEqual } from "../../../../../../utils/objectsEqual";

type Props = {
  invention: IInventionRenderData;
  column: number;
  row: number;
  top: number;
  zIndexIncreased: boolean;
  toggleZoom?: () => void;
  hideActionSlots?: boolean;
};

function Invention(props: Props) {
  const [zoomed, setZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleLoad() {
    setImageLoaded(true);
  }

  const inventionRef = React.createRef<HTMLDivElement>();

  function handleClick() {
    setZoomed((prev) => !prev);
    if (props.toggleZoom) {
      props.toggleZoom();
    }
  }

  const wrapperStyle = {
    left: props.column * 95,
    top: props.row * 140,
  };

  const enlargedClass = zoomed
    ? styles.inventionEnlarged
    : styles.zIndexTransition;

  wrapperStyle.top = zoomed ? props.top + 3 : wrapperStyle.top;
  wrapperStyle.left = zoomed ? 60 : wrapperStyle.left;

  const resources: JSX.Element[] = [];

  Object.entries(props.invention.committedResources).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      resources.push(
        <div className={styles.resource} key={i}>
          <Image
            src={`/UI/resources/${key}.png`}
            fill
            alt="surowiec"
            sizes={styles.resource}
          />
        </div>
      );
    }
  });

  const leaderId = "invention-" + props.invention.name + "-leader-0";

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  const reverse =
    props.invention.isBuilt && props.invention.type !== "scenario"
      ? "-reverse"
      : "";

  const scenarioBuiltDiv = (
    <div className={styles.scenarioBuilt}>
      <span>Zbudowano</span>
    </div>
  );

  return (
    <div
      ref={inventionRef}
      className={`${styles.invention} ${enlargedClass} ${zIndexClass}`}
      onClick={handleClick}
      style={wrapperStyle}
    >
      <Image
        src={`/UI/inventions/${props.invention.type}/${getImgName(
          props.invention.name
        )}${reverse}.png`}
        fill
        alt={"karta pomysłu"}
        sizes={styles.invention}
      />
      {
        // <div className={styles.placeholder}>
        //   <Image
        //     src={actionSlotBuildImg}
        //     fill
        //     alt={"loading"}
        //     sizes={styles.placeholder}
        //     placeholder={"blur"}
        //   />
        // </div>
      }
      {!props.invention.isBuilt &&
        !props.invention.locked &&
        !props?.hideActionSlots && (
          <div className={styles.actionSlots}>
            {getHelperActionSlots(props.invention)}
            <ActionSlot
              type="leader"
              action={ACTION.BUILD}
              actionItem={ACTION_ITEM.INVENTION}
              id={leaderId}
            />
          </div>
        )}
      {props.invention.type === "scenario" &&
        props.invention.isBuilt &&
        scenarioBuiltDiv}
      <div className={styles.committedResources}>{resources}</div>
    </div>
  );
}

export default React.memo(Invention, objectsEqual);
