import React from "react";
import styles from "./Morale.module.css";
import MoraleBar from "./MoraleBar/MoraleBar";
import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.png";
import moraleArrowRightImg from "/public/UI/icons/morale-arrow-right.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
}

function Morale(props: Props) {
    const moraleBars = [];
    const currentMorale = useAppSelector((state) => selectGame(state).moraleService.lvl!);

    for (let i = -3; i <= 3; i++) {
        moraleBars.push(
            <MoraleBar current={i === currentMorale} value={i} key={i}/>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftBar}>
                <div className={styles.arrow}>
                    <ResizableImage
                        src={moraleArrowLeftImg}
                        fill
                        sizes={styles.arrow}
                        alt={"spadek morali"}
                    />
                </div>
            </div>
            <div className={styles.rightBar}>
                <div className={styles.arrow}>
                    <ResizableImage
                        src={moraleArrowRightImg}
                        fill
                        sizes={styles.arrow}
                        alt={"przypływ morali"}
                    />
                </div>
            </div>
            <div className={styles.botBar}>{moraleBars}</div>
        </div>
    );
}

export default React.memo(Morale);
