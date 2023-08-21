// @flow
import * as React from "react";
import styles from "../CardResolve.module.css";
import Image from "next/image";
import i18n from "../../../../../I18n/I18n";
import { getImgName } from "../../../../../utils/getImgName";
import { IAdventureCardRenderData } from "../../../../../interfaces/AdventureService/AdventureCard";
import { CardActions } from "../Actions/CardActions";
import { ZoomButton } from "../ZoomButton/ZoomButton";
import { IMysteryCardRenderData } from "../../../../../interfaces/MysteryService/MysteryCard";
import { isAdventureCard } from "../../../../../utils/isAdventureCard";
import { AdventureCard } from "../../../../../server/Game/AdventureService/AdventureCardCreator/AdventureCard";

type Props = {
  card: IAdventureCardRenderData | IMysteryCardRenderData;
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

  let l: IMysteryCardRenderData;

  let label1: string = ""
  let label2: string = ""


  if ("action" in props.card && !props.eventStage) {
    // ADVENTURE CARD
    label1 = i18n.t(`adventureOptionLabel.${props.card.option1Label}`)
    label2 = props.card.shouldDecide
    ? i18n.t(`adventureOptionLabel.${props.card.option2Label}`)
    : ""
  } else if ("eventOptions" in props.card) {
    // ADVENTURE CARD IN EVENT STAGE
    if ( props.card.eventOptions && props.card.eventOptions.every((card) => card.canBeResolved)) {
      label1 = props.card.eventOptions[0].label;
      label2 = props.card.eventOptions[1].label;
    } else {
      label1 = "Dalej";
    }
  } else if ("eventLabel" in props.card) {
    //MYSTERY CARD
    label1 = props.card.eventLabel
    label2 = "";
    if (!label1) {
      label1 = "Dalej"
    }
  }
  
  let imageUrl = "action" in props.card ? `/UI/cards/adventure/${props.card.action}/${getImgName(
    props.card.name
  )}.png` : `/UI/cards/mystery/${props.card.type}/${getImgName(props.card.name)}.png`

  return (
    <>
      <div className={styles.zoomButton}>
        <ZoomButton onClick={handleZoomClick} cardType={"adventure"} />
      </div>
      {!props.eventStage && isAdventureCard(props.card) && (
        <CardActions
        label1={label1}
        label2={label2}
        triggerAction1={handleOption1Click}
        triggerAction2={handleOption2Click}
        action1Locked={false}
        action2Locked={!props.card.shouldDecide}
      />
      )}
      {props.eventStage && label1 && (
        <CardActions
        label1={label1}
        label2={label2}
        triggerAction1={handleOption1Click}
        triggerAction2={handleOption2Click}
        action1Locked={false}
        action2Locked={false}
      />
      )}
      
      <Image
        src={imageUrl}
        alt={"wydarzenie"}
        fill
        sizes={styles.card}
        unselectable={"on"}
        draggable={"false"}
      />
    </>
  );
};
