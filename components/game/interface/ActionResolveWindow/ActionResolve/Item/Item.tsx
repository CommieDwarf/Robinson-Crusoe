// @flow
import * as React from "react";
import {IResolvableItemRenderData, RESOLVE_ITEM_STATUS} from "../../../../../../interfaces/ActionService/ActionStatus";

import styles from "./Item.module.css";
import EventCard from "../../../threat/Card";

type Props = {
    status: RESOLVE_ITEM_STATUS;
    item: IResolvableItemRenderData;
};
export const Item = (props: Props) => {
    let item;


    if (props.item.name.includes("threat")) {
        if (props.item.name.includes("left")) {

        }
    }


    return <div className={styles.container}>
        <EventCard card={}/>

    </div>;
};
