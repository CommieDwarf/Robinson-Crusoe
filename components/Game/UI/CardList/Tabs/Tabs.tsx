// @flow
import * as React from "react";
import styles from "./Tabs.module.css";
import {Tab} from "../CardList";

type Props = {
    switchTab: (tab: Tab) => void;
    currentTab: Tab;
};
export const Tabs = (props: Props) => {
    function handleInventionsClick() {
        props.switchTab("inventions");
    }

    function handleMysteryClick() {
        props.switchTab("mysteryCards");
    }

    function handleItemsClick() {
        props.switchTab("items");
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.tab} ${
                    props.currentTab === "inventions" && styles.selected
                }`}
                onClick={handleInventionsClick}
            >
                Pomysły
            </div>
            <div
                className={`${styles.tab} ${
                    props.currentTab === "mysteryCards" && styles.selected
                }`}
                onClick={handleMysteryClick}
            >
                K. Tajemnic
            </div>
            <div className={`${styles.tab} ${props.currentTab === "items" && styles.selected}`}
                 onClick={handleItemsClick}>
                Przedmioty
            </div>
        </div>
    );
};
