// @flow
import * as React from "react";
import styles from "./WeatherToken.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { IWeatherTokens } from "@shared/types/Game/Weather/Weather";

type Props = {
    token: keyof IWeatherTokens;
};
export const WeatherToken = (props: Props) => {
    return (
        <div className={styles.container}>
            <DynamicImage
                src={`/UI/weather/tokens/${props.token}.webp`}
                fill
                alt={"token pogody"}
                sizes={styles.container}
            />
        </div>
    );
};
