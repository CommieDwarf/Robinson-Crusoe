import * as React from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ResolveItems } from "./ActionResolve/ResolveItems";
import { IActionServiceRenderData } from "../../../../interfaces/ActionService/ActionService";
import { IActionSlotsRenderData } from "../../../../interfaces/ActionSlots";
import { NextActionButton } from "./NextActionButton/NextActionButton";
import { Action } from "../../../../interfaces/Action";
import { RollDiceWindow } from "../RollDiceWindow/RollDiceWindow";
import { useEffect, useState } from "react";
import { ActionRollDiceInfo } from "../../../../interfaces/RollDice/RollDice";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
  setNextAction: () => void;
  resolveItem: (action: Action, droppableId: string) => void;
  setNextPhase: () => void;
};
export const ActionResolveWindow = (props: Props) => {
  let containerRef = React.createRef<HTMLDivElement>();

  const [resolved, setResolved] = useState<Map<string, boolean>>(new Map());
  const [rollDiceDone, setRollDiceDone] = useState(true);

  useEffect(() => {
    const item = props.actionService.lastResolvedItem;
    if (item && !item.diceRoll && !resolved.has(item.droppableId)) {
      console.log("set resolved");
      setResolved((old) => {
        const copy = new Map(old);
        copy.set(item.droppableId, true);
        return copy;
      });
    }
  }, [props.actionService.lastResolvedItem]);

  function resolve(item: IResolvableItemRenderData) {
    props.resolveItem(item.action, item.droppableId);
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <RollDiceWindow
        item={props.actionService.lastResolvedItem}
        setResolved={setResolved}
        resolved={resolved}
      />
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
        resolve={resolve}
        resolved={resolved}
      />
      {props.actionService.currentResolve.finished &&
        resolved.size === props.actionService.currentResolve.items.length && (
          <NextActionButton
            currentAction={props.actionService.currentResolve.action}
            setNextAction={props.setNextAction}
            setNextPhase={props.setNextPhase}
            setResolved={setResolved}
          />
        )}
    </div>
  );
};
