import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import styles from "./ActionOrder.module.css";
import React from "react";
import {actionOrder} from "@shared/constants/actionOrder";
import {capitalize} from "lodash";
import {useTranslation} from "react-i18next";
import {ActionIcon} from "./ActionIcon/ActionIcon";


type Props = {
    actionOrderContainerRef?: React.RefObject<HTMLDivElement>
}

export default function ActionOrder(props: Props) {
    let actionIcons: JSX.Element[] = [];


    actionOrder.forEach((action, i) => {
        if (i > 0) {
            actionIcons.push(
                <div className={styles.redArrow} key={i}>
                    <ResizableImage
                        src={redArrowImg}
                        alt="strzałka"
                    />
                </div>
            );
        }
        actionIcons.push(
            <ActionIcon action={action} key={i + 100}/>
        );
    });

    const {t} = useTranslation();

    return (
        <div className={styles.container} ref={props.actionOrderContainerRef}>
            <div className={styles.label}>{capitalize(t("other.action order"))}</div>
            {actionIcons}
        </div>
    );
}
