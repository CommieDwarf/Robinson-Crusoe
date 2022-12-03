import React from "react";
import styles from "./Tokens.module.css";
import scrollbarStyles from "./Scollbar.module.css";
import Scrollbar from "../Scrollbar";
import { ITokenRenderData } from "../../../../interfaces/TokenService/Token";
import { Token } from "./Token/Token";

interface Props {
  discoveryTokens: ITokenRenderData[];
}

export default function Tokens(props: Props) {
  console.log(props.discoveryTokens);
  return (
    <div className={styles.container}>
      <Scrollbar styleModule={scrollbarStyles}>
        <div className={styles.content}>
          {props.discoveryTokens.map((token, i) => {
            return <Token key={i} token={token} />;
          })}
        </div>
      </Scrollbar>
    </div>
  );
}
