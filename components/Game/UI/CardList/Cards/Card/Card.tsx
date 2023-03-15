// @flow
import * as React from "react";
import { IMysteryCardRenderData } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IInventionRenderData } from "../../../../../../interfaces/InventionService/Invention";
import { isCardInvention } from "../../../../../../utils/isCardInvention";
import Invention from "./Invention/Invention";
import { MysteryCard } from "./MysteryCard/MysteryCard";

type Props = {
  card: IMysteryCardRenderData | IInventionRenderData;
  column: number;
  row: number;
  top: number;
  zIndexIncreased: boolean;
  toggleZoom: () => void;
  hideActionSlots?: boolean;
};
export const Card = (props: Props) => {
  if (isCardInvention(props.card)) {
    return <Invention invention={props.card} {...props} />;
  } else {
    return <MysteryCard mysteryCard={props.card} {...props} />;
  }
};
