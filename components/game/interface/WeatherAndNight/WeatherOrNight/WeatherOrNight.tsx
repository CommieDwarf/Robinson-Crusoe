// @flow
import * as React from 'react';
import styles from "./WeatherOrNight.module.css";

type Props = {
    type: "weather" | "night";
};
export const WeatherOrNight = (props: Props) => {
    return (
        <div className={styles.container + " " + styles[props.type]}>

        </div>
    );
};