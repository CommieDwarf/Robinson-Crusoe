import React, { Ref, useEffect, useRef } from "react";
import styles from "./ChatLog.module.css";
import Scrollbar from "../Scrollbar";
import scrollStyles from "./Scrollbar.module.css";
import { LogMessage } from "./LogMessage/LogMessage";
import { ILogMessageRenderData } from "../../../../interfaces/ChatLog/LogMessage";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  logMessages: ILogMessageRenderData[];
}

export default function ChatLog(props: Props) {
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  });

  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        <Scrollbar styleModule={scrollStyles} scrollbarRef={scrollbarRef}>
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
