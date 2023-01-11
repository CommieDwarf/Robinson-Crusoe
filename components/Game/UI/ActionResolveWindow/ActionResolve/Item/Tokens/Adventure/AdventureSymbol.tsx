// @flow
import * as React from "react";
import styles from "./AdvntureSymbol.module.css";
import Image from "next/image";
import { AdventureAction } from "../../../../../../../../interfaces/ACTION";

type Props = {
  action: AdventureAction;
};
export const AdventureSymbol = (props: Props) => {
  return (
    <div className={`${styles.container}`}>
      <Image
        src={`/UI/tokens/adventure/${props.action}.png`}
        alt={"ikona przygody"}
        fill
        sizes={styles.container}
      />
    </div>
  );
};
