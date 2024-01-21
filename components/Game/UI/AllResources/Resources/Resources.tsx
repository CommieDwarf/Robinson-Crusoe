// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import {IBasicResourcesAmount} from "../../../../../interfaces/Resources/Resources";
import Image from "next/image";
import {useEffect, useRef} from "react";

type Props = {
    type: "future" | "owned";
    basic: Map<keyof IBasicResourcesAmount, number>;
    tokenAmount: number;
    treasureAmount: number;
};

interface AllResources extends IBasicResourcesAmount {
    token: number;
    treasure: number;

}


export const Resources = (props: Props) => {
    const resources: JSX.Element[] = [];

    const allResources = new Map<keyof AllResources, number>(
        [...props.basic,
            ["token", props.tokenAmount],
            ["treasure", props.treasureAmount]
        ]
    );

    const oldValues = usePreviousValue(allResources);
    let color = "black";

    allResources.forEach((value, key) => {
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
                    <Image
                        src={`/UI/resources/${key}.png`}
                        fill
                        alt={key}
                        sizes={styles.icon}
                    />
                </div>
                <div className={`${styles.value} ${valueChanged ? styles.valueChanged : ""}`}>{value}</div>
            </div>
        );
    });


    return (
        <div className={styles.container}>
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
