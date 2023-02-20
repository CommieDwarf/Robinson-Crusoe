// @flow
import * as React from "react";
import styles from "./ReRoll.module.css";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";
import { insertIconsIntoText } from "../../../../../utils/insertIconsIntoText";
import { ACTION } from "../../../../../interfaces/ACTION";

type Props = {
  actionService: IActionServiceRenderData;
  onReRollButtonClick: () => void;
};
export const ReRoll = (props: Props) => {
  let character = props.actionService.lastRolledItem?.leaderPawn.character;
  let skill;
  let action;

  if (character) {
    switch (character.name) {
      case "cook":
        skill = character.skills.find((skill) => skill.name === "scrounger");
        action = ACTION.GATHER;
    }
  }

  return (
    <div className={styles.container}>
      {skill && character && props.actionService.action === action && (
        <>
          <div>{skill.namePL}</div>
          <div
            className={`${styles.button} ${
              character.determination > skill.cost ? styles.buttonClickable : ""
            }`}
            onClick={props.onReRollButtonClick}
          >
            {insertIconsIntoText(
              `Przerzuć (${skill.cost}/${character?.determination})$determination$`
            )}
          </div>
        </>
      )}
    </div>
  );
};
