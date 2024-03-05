import React from "react";
import styles from "./AllResources.module.css";
import frameStyles from "./Frame/Frame.module.css";
import {IBasicResourcesAmount} from "@sharedTypes/Resources/Resources";

import {Frame} from "./Frame/Frame";
import {Resources} from "./Resources/Resources";
import productionImg from "/public/UI/phase/production.png";
import boardImg from "/public/UI/misc/board.jpg";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {objectsEqual} from "@sharedUtils/objectsEqual";

interface Props {
    owned: {
        basic: Map<keyof IBasicResourcesAmount, number>;
        tokenAmount: number;
        treasureAmount: number;
    };
    future: {
        basic: Map<keyof IBasicResourcesAmount, number>;
        tokenAmount: number;
        treasureAmount: number;
    };
}

function AllResources(props: Props) {
    return (
        <div className={styles.container}>
            <Frame/>
            <div className={`${styles.resources} ${styles.future}`}>
                <Resources type={"future"} {...props.future} />
            </div>
            <div className={frameStyles.midBar}>
                <ResizableImage src={boardImg} alt={"ramka"}/>
                <div className={frameStyles.barDecoration}>
                    <div className={frameStyles.productionIcon}>
                        <ResizableImage
                            src={productionImg}
                            alt={"ikona produkcji"}
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.resources} ${styles.owned}`}>
                <Resources type={"owned"} {...props.owned} />
            </div>
        </div>
    );
}


export default React.memo(AllResources, objectsEqual);
