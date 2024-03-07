// @flow
import * as React from "react";
import styles from "./CardActions.module.css";
import {capitalize} from "lodash";

type Props = {
    label1: string;
    label2: string;
    triggerAction1: () => void;
    triggerAction2: () => void;
    action1Locked: boolean;
    action2Locked: boolean;
};
export const CardActions = (props: Props) => {
    const action1LockedClass = props.action1Locked ? styles.actionLocked : "";
    const action2LockedClass = props.action2Locked ? styles.actionLocked : "";

    function handleAction1Click() {
        if (!props.action1Locked) {
            props.triggerAction1();
        }
    }

    function handleAction2Click() {
        if (!props.action2Locked) {
            props.triggerAction2();
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.action} ${action1LockedClass}`}
                onClick={handleAction1Click}
            >
                {capitalize(props.label1)}
            </div>
            {props.label2 && (
                <div
                    className={`${styles.action} ${action2LockedClass}`}
                    onClick={handleAction2Click}
                >
                    {capitalize(props.label2)}
                </div>
            )}
        </div>
    );
};
