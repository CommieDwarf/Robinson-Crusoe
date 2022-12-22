// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import { RoundSquare } from "../../scenario/Scenario/Scenarios/Castaways/RoundSquare";
import Image from "next/image";
import { ILogMessageRenderData } from "../../../../../interfaces/ChatLog/LogMessage";
import { toUpper } from "lodash";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";

type Props = {
  message: ILogMessageRenderData;
};
export const LogMessage = (props: Props) => {
  const msg = props.message;
  return (
    <div className={styles.container}>
      <RoundSquare
        round={msg.round}
        currentRound={true}
        ship={false}
        weather={{ rain: false, snow: false, hungryAnimal: false }}
        chatLog={true}
      ></RoundSquare>
      <div className={styles.phaseIcon}>
        <Image
          src={"/interface/phase/" + msg.phase + ".png"}
          fill
          alt={"faza"}
          sizes={styles.phaseIcon}
        />
      </div>
      {}
      <div className={styles.messageContent}>
        <span className={styles.messageSource}>
          {capitalizeFirstLetter(msg.source)} -{" "}
        </span>
        <span className={styles.message + " " + styles[msg.color]}>
          {capitalizeFirstLetter(msg.message)}
        </span>
      </div>
    </div>
  );
};
