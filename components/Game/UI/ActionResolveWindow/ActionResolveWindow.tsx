import * as React from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ResolveItems } from "./ActionResolve/ResolveItems";
import { IActionServiceRenderData } from "../../../../interfaces/ActionService/ActionService";
import { IActionSlotsRenderData } from "../../../../interfaces/ActionSlots";
import { NextActionButton } from "./NextActionButton/NextActionButton";
import { ACTION } from "../../../../interfaces/ACTION";
import { RollDiceWindow } from "./RollDiceWindow/RollDiceWindow";
import { useEffect, useState } from "react";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";
import {
  ActionDiceSide,
  ActionResults,
  DiceActionType,
  RollDiceResult,
} from "../../../../interfaces/RollDice/RollDice";
import Entries from "../../../../interfaces/Entries";
import actionIconImg from "/public/UI/phase/action.png";
import { getImgName } from "../../../../utils/getImgName";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
  setNextAction: () => void;
  resolveItem: (action: ACTION, droppableId: string) => void;
  setNextPhase: () => void;
};
export const ActionResolveWindow = (props: Props) => {
  let containerRef = React.createRef<HTMLDivElement>();

  const [resolved, setResolved] = useState<Map<string, boolean>>(new Map());
  const [rollDiceDone, setRollDiceDone] = useState(true);

  function setItemResolved(name: string) {
    setResolved((old) => {
      if (old.has(name)) {
        return old;
      }
      const copy = new Map(old);
      copy.set(name, true);
      return copy;
    });
  }

  useEffect(() => {
    const item = props.actionService.lastResolvedItem;
    if (item && !item.diceRoll && !resolved.has(item.droppableId)) {
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

  const results = new Map<
    keyof ActionResults,
    RollDiceResult<ActionDiceSide>
  >();

  const lastItem = props.actionService.lastResolvedItem;
  if (lastItem?.diceRoll) {
    const entries = Object.entries(
      lastItem.diceRoll.results
    ) as Entries<ActionResults>;
    entries.forEach(([key, value]) => {
      results.set(key, value);
    });
  }

  let name = lastItem ? lastItem.droppableId : null;
  const itemResolved = name ? resolved.has(name) : false;

  return (
    <div className={styles.container} ref={containerRef}>
      <RollDiceWindow
        name={name}
        results={results}
        type={props.actionService.currentResolve.action as DiceActionType}
        setResolved={setItemResolved}
        resolved={itemResolved}
      />
      <div className={styles.header}>
        <div className={styles.actionIcon}>
          <Image
            src={actionIconImg}
            fill
            alt={"akcja"}
            className={styles.actionIcon}
            sizes={styles.actionIcon}
          />
        </div>
        <div className={styles.title}>Faza Akcji</div>
        <div className={styles.actionIcon}>
          <Image
            src={`/UI/actions/${getImgName(
              props.actionService.currentResolve.action
            )}.png`}
            fill
            sizes={styles.actionIcon}
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
