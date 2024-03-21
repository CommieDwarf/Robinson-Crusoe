// @flow
import * as React from "react";

import styles from "./WoodPile.module.css";
import fireImg from "/public/UI/scenarios/fire.png";
import woodImg from "/public/UI/resources/wood.png";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {socketEmitter} from "../../../../../../../pages/_app";

type Props = {
    lvl: number;
    committedWood: number;
    canAddWood: boolean;
    isFireBuilt: boolean;
};
export const WoodPile = (props: Props) => {

    function handleButtonClick() {
        socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE);
    }


    const buttonLockedClass = props.canAddWood ? "" : styles.buttonLocked;
    const fireNotBuiltClass = props.isFireBuilt ? "" : styles.fireNotBuilt;

    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={`${styles.fire} ${fireNotBuiltClass}`}>
                <ResizableImage src={fireImg} fill alt={"ogień"} sizes={styles.fire}/>
            </div>
            <div
                className={`${styles.woodStack} ${styles["level" + props.lvl]}`}
            >
                <ResizableImage
                    src={`/UI/scenarios/castaways/woodStack${props.lvl}.png`}
                    fill
                    sizes={styles.woodStack}
                    alt={"stos drewna"}
                />
            </div>
            <div className={styles.title}>{capitalize(t("other.wood pile"))} {props.lvl}/5</div>
            {props.lvl < 5 &&
                <div className={styles.wood}>

                    <div className={styles.woodAmount}>
                        {props.committedWood}/{props.lvl}
                    </div>
                    <div className={styles.woodImage}>
                        <ResizableImage src={woodImg} fill alt={"drewno"} sizes={styles.woodImage}/>
                    </div>
                    {props.lvl < 5 &&
                        <div className={`${styles.woodButton} ${styles.addWoodButton} ${buttonLockedClass}`}
                             onClick={handleButtonClick}>+
                        </div>
                    }
                </div>
            }
        </div>
    );
};
