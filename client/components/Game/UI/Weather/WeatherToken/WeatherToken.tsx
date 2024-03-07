// @flow
import * as React from "react";
import styles from "./WeatherToken.module.css";
import {IWeatherTokens} from "@shared/types/Weather/Weather";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    token: keyof IWeatherTokens;
};
export const WeatherToken = (props: Props) => {
    return (
        <div className={styles.container}>
            <ResizableImage
                src={`/UI/weather/tokens/${props.token}.png`}
                fill
                alt={"token pogody"}
                sizes={styles.container}
            />
        </div>
    );
};
