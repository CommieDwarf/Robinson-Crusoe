// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import {IAdventureCardRenderData} from "../../../../../server/src/types/AdventureService/AdventureCard";
import {objectsEqual} from "../../../../../utils/objectsEqual";
import {IMysteryServiceRenderData} from "../../../../../server/src/types/MysteryService/MysteryService";
import {Adventure} from "./Adventure/Adventure";
import {Mystery} from "./Mystery/Mystery";
import {IMysteryCardRenderData} from "../../../../../server/src/types/MysteryService/MysteryCard";

type Props = {
    renderData: IAdventureCardRenderData | IMysteryServiceRenderData | IMysteryCardRenderData
    resolve: (option: 1 | 2) => void;
    triggerDrawEffect: () => void;
    eventStage: boolean;
};
const CardResolve = (props: Props) => {
    const [enlarged, setEnlarged] = useState(false);

    function toggleZoom() {
        setEnlarged((state) => !state);
    }


    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
                    {"action" in props.renderData || "eventLabel" in props.renderData ? (
                        <Adventure
                            card={props.renderData}
                            resolve={props.resolve}
                            toggleZoom={toggleZoom}
                            eventStage={props.eventStage}
                        />
                    ) : (
                        <Mystery
                            {...props.renderData}
                            draw={props.resolve}
                            toggleZoom={toggleZoom}
                            resolve={props.triggerDrawEffect}
                        />
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default React.memo(CardResolve, objectsEqual);
