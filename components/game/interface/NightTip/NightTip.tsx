// @flow
import * as React from "react";
import styles from "./NightTip.module.css";
import Image from "next/image";

type Props = {
    hideNightTip: () => void;
};
export const NightTip = (props: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={props.hideNightTip}>X</div>
            <header className={styles.header}>
                <span className={styles.title}>Nastała Noc</span>
                <div className={styles.nightPicture}>
                    <Image
                        src={"/interface/phase/night-pic.png"}
                        alt={"noc"}
                        fill
                        sizes={styles.nightPicture}
                    />
                </div>
            </header>
            <div className={styles.tip}>
                <p>
                    W tej fazie możesz się leczyć umiejetnościami i żetonami oraz
                    przenieść swój obóz.
                </p>
                <p>
                    Aby przenieść obóz kliknij na niego, a następnie kliknij na odkryty
                    kafelek graniczący z obecnym obozem.
                </p>
            </div>
        </div>
    );
};
