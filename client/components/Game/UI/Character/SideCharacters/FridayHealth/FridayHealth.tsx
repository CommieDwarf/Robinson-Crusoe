import React from "react";
import styles from "./FridayHealth.module.css";
import redHeartImg from "/public/UI/icons/red-heart.png";
import heartImg from "/public/UI/icons/heart.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";

interface Props {
    health: number;
}

export default function FridayHealth(props: Props) {
    const totalHealth = 4;

    const hearts = [];

    for (let i = totalHealth; i > 0; i--) {
        if (props.health === i) {
            hearts.push(
                <div className={styles.heart} key={i}>
                    <ResizableImage src={redHeartImg} fill alt="heart" sizes={styles.heart}/>
                </div>
            );
        } else {
            hearts.push(
                <div className={styles.heart} key={i}>
                    <ResizableImage src={heartImg} fill alt="heart" sizes={styles.heart}/>
                </div>
            );
        }
    }

    return (
        <div className={styles.health}>
            {hearts}
            <div className={styles.skull}>
                <ResizableImage src="/UI/icons/skull.png" fill alt="skull" sizes={styles.skull}/>
            </div>
        </div>
    );
}

