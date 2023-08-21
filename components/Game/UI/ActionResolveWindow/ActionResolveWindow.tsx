import * as React from "react";
import { useState } from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ResolvableItems } from "./ActionResolve/ResolvableItems";
import { IActionServiceRenderData } from "../../../../interfaces/ActionService/ActionService";
import { NextActionButton } from "./NextActionButton/NextActionButton";
import { RollDiceWindow } from "./RollDiceWindow/RollDiceWindow";
import actionIconImg from "/public/UI/phase/action.png";
import { getImgName } from "../../../../utils/getImgName";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IResolvableItem";
import { isAdventureAction } from "../../../../utils/isAdventureAction";
import { ReRoll } from "./ReRoll/ReRoll";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import { ActionDice } from "../../../../interfaces/RollDice/RollDice";
import { sleep } from "../../../../utils/sleep";
import Draggable from "react-draggable";

type Props = {
  actionService: IActionServiceRenderData;
  setNextAction: () => void;
  resolveItem: (resolvableItemID: string) => void;
  rollDices: (resolvableItemID: string) => void;
  setNextPhase: () => void;
  reRoll: (resolvableItemID: string) => void;
  useReRollSkill: (dice: ActionDice) => void;
};
export const ActionResolveWindow = (props: Props) => {
  let containerRef = React.createRef<HTMLDivElement>();

  const [resolvedItems, setResolvedItems] = useState<Map<string, boolean>>(
    new Map()
  );
  const [resItemAnimationDoneID, setResItemAnimationDoneID] = useState<
    string | null
  >(null);

  const [reRollButtonClicked, setReRollButtonClicked] = useState(false);
  const [reRolledDice, setReRolledDice] = useState<ActionDice | null>(null);
  const [reRollSkillUsed, setReRollSkillUsed] = useState(false);

  function onReRollButtonClick() {
    setReRollButtonClicked(true);
  }

  function onReRollSkillUse(dice: ActionDice) {
    setResItemAnimationDoneID(null);
    props.useReRollSkill(dice);
    setReRollButtonClicked(false);
    setReRolledDice(dice);
    setReRollSkillUsed(true);
  }

  async function onReRollSuccess(resolvableItemID: string) {
    if (reRolledDice === "success") {
      setReRolledDice(null);
      await sleep(10);
    }
    props.reRoll(resolvableItemID);
    setReRolledDice("success");
  }

  function setItemAnimationDone(id: string) {
    setResItemAnimationDoneID(id);
  }

  function setNextAction() {
    setResolvedItems(new Map());
    props.setNextAction();
  }

  function rollDices(resolvableItemID: string) {
    const item = getResolvableItem(resolvableItemID);
    setReRolledDice(null);
    if (
      item.shouldRollDices &&
      item.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
    ) {
      props.rollDices(resolvableItemID);
    }
  }

  function setItemResolved(resolvableItemID: string) {
    if (resolvableItemID !== props.actionService.lastRolledItem?.id) {
      setReRolledDice(null);
    }
    props.resolveItem(resolvableItemID);
    setResolvedItems((prevState) => {
      const copy = new Map(prevState);
      copy.set(resolvableItemID, true);
      return copy;
    });
    setReRollButtonClicked(false);
  }

  function getResolvableItem(id: string) {
    const item = props.actionService.resolvableItems.find(
      (resItem) => resItem.id === id
    );
    if (!item) {
      throw Error(`Can't find item with id: ${id}`);
    }
    return item;
  }

  return (
    <Draggable bounds="parent">

    <div className={styles.container} ref={containerRef}>
      {reRollButtonClicked && (
        <div className={styles.reRollArrowTip}>
          <Image
            src={redArrowImg}
            alt={"przerzuć kość"}
            fill
            sizes={styles.tipArrow}
          />
        </div>
      )}
      {props.actionService.lastRolledItem &&
        !resolvedItems.has(props.actionService.lastRolledItem.id) &&
        !props.actionService.lastRolledItem.shouldReRollSuccess &&
        !reRollSkillUsed && (
          <ReRoll
            actionService={props.actionService}
            onReRollButtonClick={onReRollButtonClick}
          />
        )}

      {props.actionService.lastRolledItem &&
        isAdventureAction(props.actionService.action) && (
          <RollDiceWindow
            resolvableItem={props.actionService.lastRolledItem}
            type={props.actionService.action}
            setItemAnimationDone={setItemAnimationDone}
            reRollClicked={reRollButtonClicked}
            reRoll={onReRollSkillUse}
            reRolledDice={reRolledDice}
          />
        )}
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
            src={`/UI/actions/${getImgName(props.actionService.action)}.png`}
            fill
            sizes={styles.actionIcon}
            alt={"akcja"}
          />
        </div>
      </div>
      <ResolvableItems
        actionService={props.actionService}
        resolve={setItemResolved}
        resolvedItems={resolvedItems}
        locked={
          props.actionService.lastRolledItem
            ? props.actionService.lastRolledItem.id !== resItemAnimationDoneID
            : false
        }
        rollDices={rollDices}
        reRoll={onReRollSuccess}
      />
      {props.actionService.resolvableItems.length === resolvedItems.size && (
        <NextActionButton
          setNextAction={setNextAction}
          setNextPhase={props.setNextPhase}
          actionService={props.actionService}
        />
      )}
    </div>
    </Draggable>

  );
};
