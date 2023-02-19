import Image from "next/image";
import React from "react";
import styles from "./ActionsOrder.module.css";
import { actionOrder } from "../../../../constants/actionOrder";
import { getImgName } from "../../../../utils/getImgName";
import redArrowImg from "/public/UI/misc/red-arrow.png";

import reRollImg from "/public/UI/tokens/reroll.png";
import { ActionTokens } from "../../../../interfaces/ActionService/ActionService";
import { isAdventureAction } from "../../../../utils/isAdventureAction";
import { objectsEqual } from "../../../../utils/objectsEqual";

interface Props {
  adventureTokens: ActionTokens;
  reRollTokens: ActionTokens;
}

function ActionsOrder(props: Props) {
  let actionIcons: JSX.Element[] = [];

  actionOrder.forEach((action, i) => {
    if (i > 0) {
      actionIcons.push(
        <div className={styles.redArrow} key={i}>
          <Image
            src={redArrowImg}
            fill
            alt="strzałka"
            sizes={styles.redArrow}
          />
        </div>
      );
    }
    let adventureTokenSrc = `/UI/actions/${getImgName(action)}.png`;
    let reRollToken;
    if (isAdventureAction(action)) {
      if (props.adventureTokens[action]) {
        adventureTokenSrc = `/UI/tokens/adventure/${action}.png`;
      }
      if (props.reRollTokens[action]) {
        reRollToken = (
          <div className={styles.reRoll}>
            <Image
              src={reRollImg}
              alt={"reroll"}
              fill
              sizes={styles.actionIcon}
              className={styles.reRoll}
            />
          </div>
        );
      }
    }
    actionIcons.push(
      <div className={styles.actionIcon} key={i + 100}>
        <Image
          src={adventureTokenSrc}
          fill
          alt={action}
          sizes={styles.actionIcon}
        />
        {reRollToken}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.label}>Kolejność akcji</div>
      {actionIcons}
    </div>
  );
}

export default React.memo(ActionsOrder, objectsEqual);
