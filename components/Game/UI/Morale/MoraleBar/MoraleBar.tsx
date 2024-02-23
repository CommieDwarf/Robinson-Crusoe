import Image from "next/image";
import React, {useLayoutEffect, useRef, useState} from "react";
import styles from "./MoraleBar.module.css";
import moraleIconImg from "/public/UI/icons/morale.png";
import heartImg from "/public/UI/misc/heart.png";
import crossLineImg from "/public/UI/misc/cross-line.png";

interface Props {
    current: boolean;
    value: number;
}

export default function MoraleBar(props: Props) {
    const moraleBar0Class = props.value == 0 ? styles.moraleBar0 : "";
    const morale0Value = props.value === 0 ? styles.morale0Value : "";
    const moraleCurrentClass = props.current ? styles.current : "";
    const barRef = useRef<HTMLDivElement>(null);
    const [barHeight, setBarHeight] = useState<number>(0);
    useLayoutEffect(() => {
        if (barRef.current) {
            setBarHeight()
        }
    }, [])

    if (props.value !== 3) {
        return (
            <div
                className={
                    styles.moraleBar + " " + moraleBar0Class + " " + moraleCurrentClass
                }
            >
                <div className={styles.moraleLabel}>
                    <div className={`${styles.moraleValue} ${morale0Value}`}>{props.value}</div>
                    {props.value !== 0 && (
                        <div className={styles.moraleIcon}>
                            <div className={styles.moraleImg}>
                                <Image
                                    src={moraleIconImg}
                                    fill
                                    alt="morale"
                                    sizes={styles.moraleIcon}
                                />
                            </div>

                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={
                    styles.moraleBar +
                    " " +
                    styles.lastMoraleBar +
                    " " +
                    moraleCurrentClass
                }
            >
                <div className={styles.moraleLabel}>
                    <div className={styles.lastMoraleBarValue}>3</div>
                    <div className={styles.lastMoraleIcon}>
                        <Image
                            src={moraleIconImg}
                            fill
                            alt="morale"
                            sizes={styles.lastMoraleBar}
                        />
                    </div>
                    <div className={styles.heart}>
                        <Image src={heartImg} fill alt="życie" sizes={styles.heart}/>
                    </div>
                    <div className={styles.crossLine}>
                        <Image src={crossLineImg} alt={""} fill/>
                    </div>
                </div>
            </div>
        );
    }
}
