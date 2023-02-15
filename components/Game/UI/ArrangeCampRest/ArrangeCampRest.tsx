import React from "react";
import styles from "./ArrangeCampRest.module.css";
import RestArrange from "./RestOrArrangeCamp/RestArrange";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { IArrangeCampRestServiceRenderData } from "../../../../interfaces/RestArrangeCampService/ArrangeCampRestService";
import { ACTION } from "../../../../interfaces/ACTION";

interface Props {
  arrangeCampRestService: IArrangeCampRestServiceRenderData;
  zIndex: string;
}

export default function ArrangeCampRest(props: Props) {
  const zIndexClass =
    props.zIndex.includes("rest") || props.zIndex.includes("arrangeCamp")
      ? styles.zIndexIncreased
      : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <RestArrange
        pawnAmount={props.arrangeCampRestService.pawnAmount.rest}
        type={ACTION.REST}
      />
      <RestArrange
        pawnAmount={props.arrangeCampRestService.pawnAmount.arrangeCamp}
        type={ACTION.ARRANGE_CAMP}
      />
    </div>
  );
}
