import React from "react";
import Construction from "./Construction/Construction";
import styles from "./Constructions.module.css";
import {CONSTRUCTION, IConstructionRenderData} from "@shared/types/Game/ConstructionService/Construction";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";


interface Props {
    constructions: IConstructionRenderData[];
    zIndex: string;
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
                                     ownedResources={props.ownedResources}
                                     naturalShelter={props.naturalShelter}
                                     hideActionSlots={props.constructions[i].lvl > 0 && props.constructions[i].name === CONSTRUCTION.SHELTER}
                />
            })}
        </div>
    );
}
