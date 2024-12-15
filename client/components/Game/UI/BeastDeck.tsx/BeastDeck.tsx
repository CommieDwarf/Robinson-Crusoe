import styles from "./BeastDeck.module.css";
import ActionSlot from "../ActionSlot";
import beastReverseImg from "/public/UI/cards/reverse/beast.png";
import React from "react";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {getActionSlotDroppableId} from "@shared/utils/getActionSlotDroppableId";
import {ACTION} from "@shared/types/Game/ACTION";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
    topLayer: boolean;
}

export default function BeastDeck(props: Props) {
    const beastAmount = useAppSelector((state) => selectGame(state)?.beastService.deckCount!);
    const dragDisabled = useAppSelector((state) => state.UITour.UiStates.scenarioOpen);

    return (
        <div className={styles.container + " " + (props.topLayer && styles.zIndexIncreased)}>
            <div className={styles.card + " " + (beastAmount === 0 && styles.locked)}>
                <ResizableImage src={beastReverseImg} alt="Bestia"/>
            </div>
            <div className={styles.beastCount + " " + styles.locked}>
                {beastAmount}
            </div>

            {beastAmount > 0 && (
                <div className={styles.actionSlots}>
                    <div className={styles.actionSlot}>
                        <ActionSlot
                            type={"leader"}
                            action={ACTION.HUNT}
                            uniqueAction={ACTION.HUNT}
                            id={getActionSlotDroppableId(ACTION.HUNT, "", null, 0)}
                            isDragDisabled={dragDisabled}
                        />
                    </div>
                    <div className={styles.actionSlot}>
                        <ActionSlot
                            type={"helper"}
                            action={ACTION.HUNT}
                            uniqueAction={ACTION.HUNT}
                            id={getActionSlotDroppableId(ACTION.HUNT, "", null, 1)}
                            isDragDisabled={dragDisabled}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
