// @flow
import * as React from "react";
import styles from "./ContextMenu.module.css";
import {ITokenRenderData} from "@sharedTypes/TokenService/Token";
import capitalizeFirstLetter from "@sharedUtils/capitalizeFirstLetter";

type Props = {
    left: number;
    mouseEnterMenu: () => void;
    mouseLeaveMenu: () => void;
    token: ITokenRenderData;
    utilizeToken: (id: string) => void;
};
export const ContextMenu = (props: Props) => {
    const windowWidth = 200;
    const style = {
        left: `${props.left - windowWidth / 2}px`,
    };

    function handleClick() {
        props.utilizeToken(props.token.id);
    }

    return (
        <div
            className={styles.container}
            style={style}
            onMouseLeave={props.mouseLeaveMenu}
            onMouseEnter={props.mouseEnterMenu}
        >
            <header className={styles.header}>
                {capitalizeFirstLetter(props.token.namePL)}
            </header>
            <div className={styles.description}>
                {capitalizeFirstLetter(props.token.description)}
            </div>
            <div
                className={`${styles.useButton} ${styles.useButtonClickable}`}
                onClick={handleClick}
            >
                Użyj
            </div>
            <div className={styles.triangle}></div>
        </div>
    );
};
