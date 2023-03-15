import React from "react";
import styles from "./AllResources.module.css";

import {IBasicResourcesAmount} from "../../../../interfaces/Resources/Resources";

import {compareMapValues} from "../../../../utils/compareMapValues";
import {Frame} from "./Frame/Frame";
import {Resources} from "./Resources/Resources";
import {objectsEqual} from "../../../../utils/objectsEqual";

interface Props {
    owned: {
        basic: Map<keyof IBasicResourcesAmount, number>;
        tokenAmount: number;
        treasureAmount: number;
    };
    future: {
        basic: Map<keyof IBasicResourcesAmount, number>;
        tokenAmount: number;
        treasureAmount: number;
    };
}

function AllResources(props: Props) {
    return (
        <div className={styles.container}>
            <Frame/>
            <div className={styles.resources}>
                <Resources type={"future"} {...props.future} />
            </div>
            <div className={styles.resources}>
                <Resources type={"owned"} {...props.owned} />
            </div>
        </div>
    );
}

// function areEqual(prevProps: Props, nextProps: Props) {
//   const futureBasicEqual = objectsEqual(prevProps.future.basic, nextProps.future.basic);
//   const ownedBasicEqual = compareMapValues(prevProps.owned.basic, nextProps.owned.basic);
//
//
//   return futureBasicEqual && ownedBasicEqual;
// }

export default React.memo(AllResources, objectsEqual);
