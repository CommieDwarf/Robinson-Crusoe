import Image from "next/image";
import React from "react";

import styles from "./Determination.module.css";
import determinationTokenImg from "/public/UI/tokens/determination.png";

interface Props {
    value: number;
}

export default function Determination(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.value}>{props.value}</div>
            <div className={styles.image}>
                <Image
                    src={determinationTokenImg}
                    fill
                    alt="determination icon"
                    sizes={styles.image}
                />
            </div>
        </div>
    );
}
