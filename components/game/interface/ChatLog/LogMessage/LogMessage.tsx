// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import { RoundSquare } from "../../scenario/Scenario/Scenarios/Castaways/RoundSquare";
import Image from "next/image";
import { ILogMessageRenderData } from "../../../../../interfaces/ChatLog/LogMessage";

type Props = {
  message: ILogMessageRenderData;
};
export const LogMessage = (props: Props) => {
  const msg = props.message;
  return (
    <div className={styles.container}>
      <RoundSquare
        round={msg.turn}
        currentRound={true}
        ship={false}
        weather={{ rain: false, snow: false, hungryAnimal: false }}
        chatLog={true}
      ></RoundSquare>
      <div className={styles.phaseIcon}>
        <Image
          src={"/interface/phase/" + msg.phase + ".png"}
          layout={"fill"}
          alt={"faza"}
        />
      </div>
      <div className={styles.messageContent}>
        <span className={styles.messageSource}>{msg.source} - </span>
        <span className={styles.message + " " + styles[msg.color]}>
          {msg.message}
        </span>
      </div>
    </div>
  );
};
