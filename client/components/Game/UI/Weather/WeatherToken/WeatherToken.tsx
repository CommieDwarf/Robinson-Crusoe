// @flow
import * as React from "react";
import styles from "./WeatherToken.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import { IWeatherTokens } from "@shared/types/Game/Weather/Weather";

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
