import * as React from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ResolveItems } from "./ActionResolve/ResolveItems";
import { IActionServiceRenderData } from "../../../../interfaces/ActionService/ActionService";
import { IActionSlotsRenderData } from "../../../../interfaces/ActionSlots";
import { NextActionButton } from "./NextActionButton/NextActionButton";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
};
export const ActionResolveWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.actionIcon}>
          <Image src={"/interface/phase/action.png"} layout={"fill"} />
        </div>
        <div className={styles.title}>Faza Akcji</div>
        <div className={styles.actionIcon}>
          <Image
            src={
              "/interface/actions/" +
              props.actionService.currentResolve +
              ".png"
            }
            layout={"fill"}
            alt={"akcja"}
          />
        </div>
      </div>
      <ResolveItems
        actionService={props.actionService}
        actionSlots={props.actionSlots}
      />
      <NextActionButton currentAction={props.actionService.currentResolve} />
    </div>
  );
};
