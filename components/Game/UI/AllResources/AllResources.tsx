import Image from "next/image";
import React from "react";
import styles from "./AllResources.module.css";

import { IResourcesAmount } from "../../../../interfaces/Resources/Resources";

import { compareMapValues } from "../../../../utils/compareMapValues";
import { Frame } from "./Frame/Frame";
import { Resources } from "./Resources/Resources";

interface Props {
  owned: Map<keyof IResourcesAmount, number>;
  future: Map<keyof IResourcesAmount, number>;
}

function AllResources(props: Props) {
  return (
    <div className={styles.container}>
      <Frame />
      <div className={styles.resources}>
        <Resources type={"future"} resources={props.future} />
      </div>
      <div className={styles.resources}>
        <Resources type={"owned"} resources={props.owned} />
      </div>
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props) {
  const futureEqual = compareMapValues(prevProps.future, nextProps.future);
  const ownedEqual = compareMapValues(prevProps.owned, nextProps.owned);

  return futureEqual && ownedEqual;
}

export default React.memo(AllResources, areEqual);
