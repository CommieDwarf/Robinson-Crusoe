// @flow
import * as React from "react";
import {
  DiscoveryTokenName,
  ITokenRenderData,
} from "../../../../../interfaces/TokenService/Token";
import styles from "./Token.module.css";
import Image from "next/image";

type Props = {
  token: ITokenRenderData;
};

export const Token = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.token}>
        <Image
          src={"/interface/tokens/discovery/" + props.token.name + ".png"}
          layout={"fill"}
          alt={"token"}
        />
      </div>
    </div>
  );
};
