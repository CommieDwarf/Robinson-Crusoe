// @flow
import * as React from "react";
import { IMysteryCardRenderData } from "../../../../../interfaces/MysteryService/MysteryCard";
import { ICharacterRenderData } from "../../../../../interfaces/Characters/Character";
import cardResolveStyles from "../CardResolve.module.css";
import { getImgName } from "../../../../../utils/getImgName";
import Image from "next/image";
import { MysteryCardsAmount } from "../../../../../interfaces/MysteryService/MysteryService";
import { MysteryCardCounter } from "./MysteryCardCounter/MysteryCardCounter";
import { CardActions } from "../Actions/CardActions";
import { ZoomButton } from "../ZoomButton/ZoomButton";

type Props = {
  isDrawingOn: boolean;
  canDraw: boolean;
  currentResolve: IMysteryCardRenderData | null;
  canFinish: boolean;
  drawer: ICharacterRenderData | null;
  resolve: (option: 1 | 2) => void;
  cardsLeft: MysteryCardsAmount;
  toggleZoom: () => void;
};

export const Mystery = (props: Props) => {
  function handleDrawClick() {
    if (props.canDraw) {
      props.resolve(1);
    }
  }

  function handleFinishClick() {
    if (props.canFinish) {
      props.resolve(2);
    }
  }

  const cardImgSrc = props.currentResolve
    ? `/UI/cards/mystery/${props.currentResolve.type}/${getImgName(
        props.currentResolve.name
      )}.png`
    : `/UI/cards/reverse/mystery.png`;

  return (
    <>
      {props.currentResolve && (
        <ZoomButton onClick={props.toggleZoom} cardType={"mystery"} />
      )}
      <MysteryCardCounter cardsLeft={props.cardsLeft} />
      <Image
        src={cardImgSrc}
        alt={"karta tajemnic"}
        fill
        sizes={cardResolveStyles.card}
        unselectable={"on"}
        draggable={"false"}
      />
      <CardActions
        label1={"Ciągnij"}
        label2={"Skończ"}
        triggerAction1={handleDrawClick}
        triggerAction2={handleFinishClick}
        action1Locked={!props.canDraw}
        action2Locked={!props.canFinish}
      />
    </>
  );
};
