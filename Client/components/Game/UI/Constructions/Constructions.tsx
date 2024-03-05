import React from "react";
import Construction from "./Construction/Construction";
import styles from "./Constructions.module.css";
import {CONSTRUCTION, IConstructionRenderData} from "../../../../../interfaces/ConstructionService/Construction";
import {IBasicResourcesAmount} from "../../../../../interfaces/Resources/Resources";

interface Props {
    constructions: IConstructionRenderData[];
    zIndex: string;
    switchCommittedResources: (construction: CONSTRUCTION) => void;
    ownedResources: IBasicResourcesAmount;
    naturalShelter: boolean;
}

export default function Constructions(props: Props) {

    let zIndexIncreasedClass = props.zIndex.includes("construction")
        ? styles.zIndexIncreased
        : "";

    return (
        <div className={styles.container + " " + zIndexIncreasedClass}>
            {props.constructions.map((construction, i) => {
                return <Construction construction={props.constructions[i]} key={i}
                                     switchCommittedResources={props.switchCommittedResources}
                                     ownedResources={props.ownedResources}
                                     naturalShelter={props.naturalShelter}
                                     hideActionSlots={props.constructions[i].lvl > 0 && props.constructions[i].name === CONSTRUCTION.SHELTER}
                />
            })}
        </div>
    );
}
