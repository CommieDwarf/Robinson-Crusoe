// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import {Resource} from "./Resource/Resource";
import {IStructuresServiceRenderData, StructureName} from "../../../../../../interfaces/Structures/Structures";
import {IResourcesAmount} from "../../../../../../interfaces/Resources/Resources";

type Props = {
    structuresService: IStructuresServiceRenderData;
    resources: IResourcesAmount;
};
export const Resources = (props: Props) => {

    function getStruct(name: StructureName) {
        const structure = props.structuresService.structures.find((struct) => struct.name === name);
        if (!structure) {
            throw new Error("Can't find structure with given name: " + name);
        }
        return structure;
    }

    const roof = getStruct("roof");
    const palisade = getStruct("palisade");
    const weapon = getStruct("weapon");


    return (
        <div className={styles.container}>
            <Resource type={"roof"} amount={roof.lvl}/>
            <Resource type={"palisade"} amount={palisade.lvl}/>
            <Resource type={"weapon"} amount={weapon.lvl}/>
            <Resource type={"wood"} amount={props.resources.wood}/>
            <Resource type={"food"} amount={props.resources.food}/>
        </div>
    );
};
