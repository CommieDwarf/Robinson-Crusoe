// @flow
import * as React from "react";

import styles from "./WoodStack.module.css";
import fireImg from "/public/UI/scenarios/fire.png";
import woodImg from "/public/UI/resources/wood.png";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";

type Props = {
    lvl: number;
    committedWood: number;
    addWood: () => void;
    canAddWood: boolean;
    isFireBuilt: boolean;
};
export const WoodStash = (props: Props) => {

    function handleButtonClick() {
        props.addWood();
    }


    const buttonLockedClass = props.canAddWood ? "" : styles.buttonLocked;
    const fireNotBuiltClass = props.isFireBuilt ? "" : styles.fireNotBuilt;

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
            <div className={styles.title}>Stos {props.lvl}/5</div>
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
