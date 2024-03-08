// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import {Adventure} from "./Adventure/Adventure";
import {Mystery} from "./Mystery/Mystery";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {IMysteryServiceRenderData} from "@shared/types/Game/MysteryService/MysteryService";

type Props = {
    renderData: IAdventureCardRenderData | IMysteryServiceRenderData | IMysteryCardRenderData
    eventStage: boolean;
};
const CardResolve = (props: Props) => {
    const [enlarged, setEnlarged] = useState(false);

    function toggleZoom() {
        setEnlarged((state) => !state);
    }

    console.log(props.renderData)

    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
                    {"action" in props.renderData || "eventLabel" in props.renderData ? (
                        <Adventure
                            card={props.renderData}
                            toggleZoom={toggleZoom}
                            eventStage={props.eventStage}
                        />
                    ) : (
                        <Mystery
                            {...props.renderData}
                            toggleZoom={toggleZoom}
                        />
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default React.memo(CardResolve, objectsEqual);
