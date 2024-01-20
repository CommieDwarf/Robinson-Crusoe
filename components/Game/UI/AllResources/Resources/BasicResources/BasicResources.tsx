import Image from "next/image";
import React, {useEffect, useRef} from "react";
import styles from "./BasicResources.module.css";
import {IBasicResourcesAmount} from "../../../../../../interfaces/Resources/Resources";

interface Props {
    resources: Map<keyof IBasicResourcesAmount, number>;
}

function usePreviousValue<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function BasicResources(props: Props) {
    const resources: JSX.Element[] = [];

    const oldValues = usePreviousValue(props)?.resources;

    let color = "black";
    props.resources.forEach((value, key) => {
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
                <div className={styles.icon}>
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
            <div className={styles.resources}> {resources}</div>
        </div>
    );
}
