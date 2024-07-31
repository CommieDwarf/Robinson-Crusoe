import React from "react";
import styles from "./Threat.module.css";
import Card from "./Card";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import redArrowCurvedImg from "/public/UI/misc/red-arrow-curved.png";
import getActionSlots from "../getActionSlots";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {getObjectsComparator} from "../../../../utils/getObjectsComparator";
import {RootState} from "../../../../store/store";
import {connect} from "react-redux";
import {IEventCardRenderData} from "@shared/types/Game/EventService/EventCard";
import CommittedResources from "../CommittedResources/CommittedResources";


interface StateProps {
    leftSlot: IEventCardRenderData | null,
    rightSlot: IEventCardRenderData | null,
}

interface Props {
    topLayer: boolean;
}


function Threat(props: StateProps & Props) {
    return (
        <div className={styles.container + " " + (props.topLayer && styles.zIndexIncreased)}>
            <Card card={props.leftSlot} slot={"left"}
            />
            <Card card={props.rightSlot} slot={"right"}
            />
            <div className={styles.arrow}>
                <ResizableImage src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
            </div>
            <div className={styles.curvedArrow}>
                <ResizableImage
                    src={redArrowCurvedImg}
                    fill
                    alt="strzałka"
                    sizes={styles.curvedArrow}
                />
            </div>
            <div className={styles.committedResources}>
                {props.leftSlot?.committedResources &&
                    <CommittedResources committedResources={props.leftSlot.committedResources}
                                        personalResourceUsed={props.leftSlot.personalResourceUsed}
                                        background={true}
                                        justifyContent={"center"}
                    />
                }
            </div>
            <div className={styles.committedResources}>
                {props.rightSlot?.committedResources &&
                    <CommittedResources committedResources={props.rightSlot.committedResources}
                                        personalResourceUsed={props.rightSlot.personalResourceUsed}
                                        background={true}
                                        justifyContent={"center"}
                    />
                }
            </div>
            <div className={styles.actionSlots}>
                {props.leftSlot
                    && getActionSlots(props.leftSlot, 0, "left")}
            </div>
            <div className={styles.actionSlots}>
                {props.rightSlot &&
                    getActionSlots(props.rightSlot, 0, "right")}
            </div>

        </div>
    );
}

const mapStateToProps = (state: RootState, props: Props) => {
    const game = selectGame(state)!;
    return {
        leftSlot: game.eventService.leftSlot,
        rightSlot: game.eventService.rightSlot,
        ...props,
    }
};

export default connect(mapStateToProps)(React.memo(Threat, getObjectsComparator()));
