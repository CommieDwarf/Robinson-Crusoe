import React from "react";
import styles from "./ChatLog.module.css";
import Scrollbar from "../Scrollbar";
import scrollStyles from "./Scrollbar.module.css";
import { LogMessage } from "./LogMessage/LogMessage";
import { ILogMessageRenderData } from "../../../../interfaces/ChatLog/LogMessage";

interface Props {
  logMessages: ILogMessageRenderData[];
}

export default function ChatLog(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        <Scrollbar styleModule={scrollStyles}>
          <div className={styles.messages}>
            {props.logMessages.map((msg, i) => {
              return <LogMessage message={msg} key={i} />;
            })}
          </div>
        </Scrollbar>
      </div>
      <div className={styles.tabButton}>Log</div>
      <div className={styles.tabButton}>Chat</div>
    </div>
  );
}
