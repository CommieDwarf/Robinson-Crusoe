import React from "react";
import styles from "./ArrangeCampRest.module.css";
import RestArrange from "./RestOrArrangeCamp/RestArrange";
import {ACTION} from "@shared/types/Game/ACTION";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IArrangeCampRestServiceRenderData} from "@shared/types/Game/RestArrangeCampService/ArrangeCampRestService";

interface Props {
    arrangeCampRestService: IArrangeCampRestServiceRenderData;
    zIndex: boolean;
}

function ArrangeCampRest(props: Props) {
    const zIndexClass = props.zIndex ? styles.zIndexIncreased : "";

    return (
        <div className={styles.container + " " + zIndexClass}>
            <RestArrange
                pawnAmount={props.arrangeCampRestService.pawnAmount.rest}
                type={ACTION.REST}
            />
            <RestArrange
                pawnAmount={props.arrangeCampRestService.pawnAmount.arrangeCamp}
                type={ACTION.ARRANGE_CAMP}
            />
        </div>
    );
}

export default React.memo(ArrangeCampRest, objectsEqual);
