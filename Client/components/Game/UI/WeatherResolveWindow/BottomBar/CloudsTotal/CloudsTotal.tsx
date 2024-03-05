// @flow
import * as React from "react";
import styles from "./CloudsTotal.module.css";
import Image from "next/image";
import {IWeatherServiceRenderData} from "../../../../../../../interfaces/Weather/Weather";
import snowCloudImg from "/public/UI/weather/snow-cloud.png";
import rainCloudImg from "/public/UI/weather/rain-cloud.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";

type Props = {
    weatherService: IWeatherServiceRenderData;
    resolved: boolean;
};
export const CloudsTotal = (props: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.label}>Łącznie:</div>
            <div className={styles.background}>
                <div className={styles.cloud}>
          <span className={styles.cloudCount}>
            {props.weatherService.overallWeather.snow}
          </span>
                    <ResizableImage
                        src={snowCloudImg}
                        fill
                        alt={"chmurka zimowa"}
                        sizes={styles.cloud}
                    />
                </div>
            </div>
            <div className={styles.background}>
                <div className={styles.cloud}>
          <span className={styles.cloudCount}>
            {props.weatherService.overallWeather.rain}
          </span>
                    <ResizableImage
                        src={rainCloudImg}
                        fill
                        alt={"chmurka deszczowa"}
                        sizes={styles.cloud}
                    />
                </div>
            </div>
        </div>
    );
};
