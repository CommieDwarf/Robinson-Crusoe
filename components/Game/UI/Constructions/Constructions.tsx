import React from "react";
import Construction from "./Construction/Construction";
import styles from "./Constructions.module.css";
import {CONSTRUCTION, IConstructionRenderData} from "../../../../interfaces/ConstructionService/Construction";
import {IBasicResourcesAmount} from "../../../../interfaces/Resources/Resources";

interface Props {
    constructions: IConstructionRenderData[];
    zIndex: string;
    switchCommittedResources: (construction: CONSTRUCTION) => void;
    ownedResources: IBasicResourcesAmount;
    naturalShelter: boolean;
}

export default function Constructions(props: Props) {
    const constructions = [];
    for (let i = 0; i < 4; i++) {
        constructions.push(
            <Construction construction={props.constructions[i]} key={i}
                          switchCommittedResources={props.switchCommittedResources}
                          ownedResources={props.ownedResources}
                          naturalShelter={props.naturalShelter}
            />
        );
    }

    let zIndexIncreasedClass = props.zIndex.includes("construction")
        ? styles.zIndexIncreased
        : "";

    return (
        <div className={styles.container + " " + zIndexIncreasedClass}>
            {constructions}
        </div>
    );
}
