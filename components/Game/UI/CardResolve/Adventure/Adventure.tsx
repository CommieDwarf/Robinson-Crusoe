// @flow
import * as React from "react";
import styles from "../CardResolve.module.css";
import Image from "next/image";
import i18n from "../../../../../I18n/I18n";
import { getImgName } from "../../../../../utils/getImgName";
import { IAdventureCardRenderData } from "../../../../../interfaces/AdventureService/AdventureCard";
import { CardActions } from "../Actions/CardActions";
import { ZoomButton } from "../ZoomButton/ZoomButton";

type Props = {
  card: IAdventureCardRenderData;
  resolve: (option: 1 | 2) => void;
  toggleZoom: () => void;
  eventStage: boolean;
};
export const Adventure = (props: Props) => {
  function handleZoomClick() {
    props.toggleZoom();
  }

  function handleOption1Click() {
    props.resolve(1);
  }

  function handleOption2Click() {
    props.resolve(2);
  }

  return (
    <>
      <div className={styles.zoomButton}>
        <ZoomButton onClick={handleZoomClick} cardType={"adventure"} />
      </div>
      {!props.eventStage && (
        <CardActions
        label1={i18n.t(`adventureOptionLabel.${props.card.option1Label}`)}
        label2={
          props.card.shouldDecide
            ? i18n.t(`adventureOptionLabel.${props.card.option2Label}`)
            : ""
        }
        triggerAction1={handleOption1Click}
        triggerAction2={handleOption2Click}
        action1Locked={false}
        action2Locked={!props.card.shouldDecide}
      />
      )}
      {props.eventStage && props.card.eventOptions && props.card.eventOptions.every((card) => card.canBeResolved) && (
        <CardActions
        label1={props.card.eventOptions[0].label}
        label2={props.card.eventOptions[1].label}
        triggerAction1={handleOption1Click}
        triggerAction2={handleOption2Click}
        action1Locked={false}
        action2Locked={false}
      />
      )}
      
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
    </>
  );
};
