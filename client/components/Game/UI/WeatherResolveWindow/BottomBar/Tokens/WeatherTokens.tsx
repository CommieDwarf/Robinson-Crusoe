// @flow
import * as React from "react";
import styles from "./WeatherTokens.module.css";
import {WeatherToken} from "../../../Weather/WeatherToken/WeatherToken";
import {IWeatherTokens} from "@shared/types/Weather/Weather";

type Props = {
    tokens: IWeatherTokens;
};

export const WeatherTokens = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {props.tokens.storm && <WeatherToken token={"storm"}/>}
                {props.tokens.snow && <WeatherToken token={"snow"}/>}
                {props.tokens.rain && <WeatherToken token={"rain"}/>}
            </div>
        </div>
    );
};
