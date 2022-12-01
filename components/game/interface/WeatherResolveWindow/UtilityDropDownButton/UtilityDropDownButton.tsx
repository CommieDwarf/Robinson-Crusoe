// @flow
import * as React from "react";
import styles from "./UtilityDropDownButton.module.css";

type Props = {
    isOpen: boolean;
    toggleOpen: () => void;
};
export const UtilityDropDownButton = (props: Props) => {

    function handleClick() {
        props.toggleOpen();
    }


    const openClass = props.isOpen ? styles.open : styles.closed;

    return <div className={styles.container + " " + openClass} onClick={handleClick}></div>;
};
