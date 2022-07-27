import React from "react";
import styles from "./Tokens.module.css";
import scrollbarStyles from "./Scollbar.module.css";
import Scrollbar from "../Scrollbar";
import Image from "next/image";

interface Props {
  tokens: string[];
}

export default function Tokens(props: Props) {
  return (
    <div className={styles.container}>
      <Scrollbar styleModule={scrollbarStyles}>
        <div className={styles.content}>
          {props.tokens.map((token, i) => {
            return (
              <div className={styles.token} key={i}>
                <Image
                  src={"/interface/tokens/" + token + ".png"}
                  layout={"fill"}
                  alt={"token"}
                />
              </div>
            );
          })}
        </div>
      </Scrollbar>
    </div>
  );
}
