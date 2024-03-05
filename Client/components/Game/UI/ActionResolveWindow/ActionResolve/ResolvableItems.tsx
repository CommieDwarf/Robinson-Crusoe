// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import {IActionServiceRenderData} from "../../../../../../interfaces/ActionService/ActionService";
import {Item} from "./Item/Item";
import capitalizeFirstLetter from "../../../../../../utils/capitalizeFirstLetter";

type Props = {
    actionService: IActionServiceRenderData;
    resolve: (resolvableItemID: string) => void;
    rollDices: (resolvableItemID: string) => void;
    resolvedItems: Map<string, boolean>;
    locked: boolean;
    reRoll: (resolvableItemID: string) => void;
    setBibleUsage: (resolvableItemId: string, value: boolean) => void;
};

export const ResolvableItems = (props: Props) => {
    const items = props.actionService.resolvableItems.map((resItem) => {
        let locked = false;
        if (props.actionService.lastRolledItem) {
            locked =
                !props.resolvedItems.has(props.actionService.lastRolledItem.id) &&
                resItem.id !== props.actionService.lastRolledItem.id;
        }
        return (
            <Item
                resolved={props.resolvedItems.has(resItem.id)}
                resolvableItem={resItem}
                actionService={props.actionService}
                resolve={props.resolve}
                key={resItem.id}
                locked={props.locked || locked}
                rollDices={props.rollDices}
                reRoll={props.reRoll}
                setBibleUsage={props.setBibleUsage}
            />
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.title + " " + styles[props.actionService.action]}>
                {capitalizeFirstLetter(props.actionService.action)}
            </div>
            <div className={styles.items}>{items}</div>
        </div>
    );
};
