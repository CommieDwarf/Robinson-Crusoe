import * as React from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ResolveItems } from "./ActionResolve/ResolveItems";
import { IActionServiceRenderData } from "../../../../interfaces/ActionService/ActionService";
import { IActionSlotsRenderData } from "../../../../interfaces/ActionSlots";
import { NextActionButton } from "./NextActionButton/NextActionButton";
import { Action } from "../../../../interfaces/Action";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
  setNextAction: () => void;
  resolveItem: (action: Action, droppableId: string) => void;
  setNextPhase: () => void;
};
export const ActionResolveWindow = (props: Props) => {
  let containerRef = React.createRef<HTMLDivElement>();
  console.log(props.actionService);

  // useEffect(() => {
  //   let mouseDownHandle = getMouseDownHandle(containerRef);
  //   containerRef.current?.addEventListener("mousedown", mouseDownHandle);
  //
  //   return () => {
  //     containerRef.current?.removeEventListener("mousedown", mouseDownHandle);
  //   };
  // });

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.actionIcon}>
          <Image src={"/interface/phase/action.png"} layout={"fill"} />
        </div>
        <div className={styles.title}>Faza Akcji</div>
        <div className={styles.actionIcon}>
          <Image
            src={
              "/interface/actions/" +
              props.actionService.currentResolve.action +
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
        resolveItem={props.resolveItem}
      />
      {props.actionService.currentResolve.finished && (
        <NextActionButton
          currentAction={props.actionService.currentResolve.action}
          setNextAction={props.setNextAction}
          setNextPhase={props.setNextPhase}
        />
      )}
    </div>
  );
};
