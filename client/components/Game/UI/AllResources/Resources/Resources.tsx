// @flow
import * as React from "react";
import {useEffect, useRef} from "react";
import styles from "./Resources.module.css";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import {kebabCase} from "lodash";
import {IBasicResourcesAmount, IResourcesRenderData} from "@shared/types/Game/Resources/Resources";
import Entries from "@shared/types/Entries";

type Props = {
    type: "future" | "owned";
    resources: IResourcesRenderData,
    tokenAmount: number | undefined,
};

interface AllResources extends IBasicResourcesAmount {
    token: number;
    treasure: number;
}


export const Resources = (props: Props) => {
    const resources: JSX.Element[] = [];



    const resourcesAmount = new Map<keyof AllResources, number>(
        [...Object.entries(props.resources.basic) as Entries<typeof props.resources.basic>,
            ["token", props.tokenAmount || 0],
            ["treasure", props.resources.treasures.length]]
    );


    const oldValues = usePreviousValue(resourcesAmount);
    let color = "black";

    resourcesAmount.forEach((value, key) => {
        let valueChanged = false;
        if (oldValues) {
            const oldValue = oldValues.get(key) as number;
            valueChanged = oldValue !== value;
            if (value > oldValue) {
                color = "limegreen"
            } else if (value < oldValue) {
                color = "red";
            }
            document.documentElement.style.setProperty("--resourceValueChangeColor", color);
        }

        resources.push(
            <div className={styles.resource} key={key}>
                <div className={`${styles.icon} ${styles[key]}`}>
                    <ResizableImage
                        src={`/UI/resources/${kebabCase(key)}.webp`}
                        alt={key}
                    />
                </div>
                <div className={`${styles.value} ${valueChanged ? styles.valueChanged : ""}`}>{value}</div>
            </div>
        );
    });

    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div className={`${styles.container} ${styles[props.type]}`} ref={containerRef}>
            <div className={styles.label}>
                {props.type === "future" ? "Przyszłe" : "Posiadane"}
            </div>
            <div className={styles.resources}>
                {resources}
            </div>
        </div>
    );
};


function usePreviousValue<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
