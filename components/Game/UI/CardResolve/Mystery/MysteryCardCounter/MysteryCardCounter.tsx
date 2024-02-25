// @flow
import * as React from "react";
import Image from "next/image";
import styles from "./MysteryCardCounter.module.css";
import {MysteryCardsAmount} from "../../../../../../interfaces/MysteryService/MysteryService";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";

type Props = {
    cardsLeft: MysteryCardsAmount;
};
export const MysteryCardCounter = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <ResizableImage
                    src={"/UI/misc/mystery-background.png"}
                    fill
                    sizes={styles.mysteryCountBackground}
                    alt={"licznik kart"}
                />
            </div>
            <div className={styles.counters}>
                {Object.entries(props.cardsLeft).map(([category, amount]) => {
                    return (
                        <div className={styles.counter} key={category}>
                            <div className={styles.categoryImg}>
                                <ResizableImage src={`/UI/misc/${category}.png`} fill alt={"licznik"}/>
                            </div>
                            <div className={styles.count}>{amount}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
