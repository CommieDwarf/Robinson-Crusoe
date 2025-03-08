// @flow
import * as React from "react";
import styles from "./Weather.module.css";
import {WeatherToken} from "./WeatherToken/WeatherToken";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

export const Weather = () => {
    const weatherTokens = useAppSelector((state) => selectGame(state)!.weatherService.tokens!);

    return (
        <div className={`${styles.container} tour-weather`}>
            {weatherTokens.storm && <WeatherToken token={"storm"}/>}
            {weatherTokens.snow && <WeatherToken token={"snow"}/>}
            {weatherTokens.rain && <WeatherToken token={"rain"}/>}
        </div>
    );
};
