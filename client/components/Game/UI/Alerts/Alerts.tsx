// @flow
import * as React from "react";
import styles from "./Alerts.module.css";
import {useAppSelector} from "../../../../store/hooks";
import {useTranslation} from "react-i18next";

type Props = {};

export function Alerts(props: Props) {

    const message = useAppSelector(state => state.alert).text
    const {t} = useTranslation();
    // @ts-ignore
    const translated: string = t(`alerts.${message}`);

    return (
        <div className={styles.container}>
            <span className={styles.alertMessage}>{message && translated}</span>
        </div>
    );
}
