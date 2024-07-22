import React from "react";
import styles from "./AllResources.module.css";
import frameStyles from "./Frame/Frame.module.css";

import {Frame} from "./Frame/Frame";
import {Resources} from "./Resources/Resources";
import productionImg from "/public/UI/phase/production.png";
import boardImg from "/public/UI/misc/board.jpg";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {useAppSelector} from "../../../../store/hooks";
import {selectResourceService} from "../../../../reduxSlices/gameSession";

interface Props {

}

function AllResources(props: Props) {

    const {future, owned} = useAppSelector(selectResourceService);


    return (
        <div className={styles.container}>
            <Frame/>
            <div className={`${styles.resources} ${styles.future}`}>
                <Resources type={"future"}
                           resources={future}

                />
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
                <Resources type={"owned"} resources={owned}/>
            </div>
        </div>
    );
}


export default React.memo(AllResources, objectsEqual);
