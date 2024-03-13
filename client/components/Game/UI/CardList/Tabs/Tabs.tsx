// @flow
import * as React from "react";
import styles from "./Tabs.module.css";
import {Tab} from "../CardList";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div
                className={`${styles.tab} ${
                    props.currentTab === "inventions" && styles.selected
                }`}
                onClick={handleInventionsClick}
            >
                {t("cardListTab.inventions")}
            </div>
            <div
                className={`${styles.tab} ${
                    props.currentTab === "mysteryCards" && styles.selected
                }`}
                onClick={handleMysteryClick}
            >
                {t("cardListTab.mystery cards")}
            </div>
            <div className={`${styles.tab} ${props.currentTab === "items" && styles.selected}`}
                 onClick={handleItemsClick}>
                {t("cardListTab.items")}
            </div>
        </div>
    );
};
