// @flow
import * as React from "react";
import styles from "./Alerts.module.css";
import {useAppSelector} from "../../../../store/hooks";

type Props = {};

export function Alerts(props: Props) {

    const message = useAppSelector(state => state.alert).text

    return (
        <div className={styles.container}>
            <span className={styles.alertMessage}>{message}</span>
        </div>
    );
}
