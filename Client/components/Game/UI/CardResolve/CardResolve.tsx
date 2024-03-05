// @flow
import * as React from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import { useState } from "react";
import { IAdventureCardRenderData } from "../../../../../interfaces/AdventureService/AdventureCard";
import { objectsEqual } from "../../../../../utils/objectsEqual";
import { IMysteryServiceRenderData } from "../../../../../interfaces/MysteryService/MysteryService";
import { Adventure } from "./Adventure/Adventure";
import { Mystery } from "./Mystery/Mystery";
import { IMysteryCardRenderData } from "../../../../../interfaces/MysteryService/MysteryCard";

type Props = {
  renderData: IAdventureCardRenderData | IMysteryServiceRenderData | IMysteryCardRenderData
  resolve: (option: 1 | 2) => void;
  triggerDrawEffect: () => void;
  eventStage: boolean;
};
const CardResolve = (props: Props) => {
  const [enlarged, setEnlarged] = useState(false);

  function toggleZoom() {
    setEnlarged((state) => !state);
  }


  return (
    <Draggable bounds={"parent"}>
      <div className={styles.container}>
        <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
          {"action" in props.renderData || "eventLabel" in props.renderData ? (
            <Adventure
              card={props.renderData}
              resolve={props.resolve}
              toggleZoom={toggleZoom}
              eventStage={props.eventStage}
            />
          ) : (
            <Mystery
              {...props.renderData}
              draw={props.resolve}
              toggleZoom={toggleZoom}
              resolve={props.triggerDrawEffect}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default React.memo(CardResolve, objectsEqual);
