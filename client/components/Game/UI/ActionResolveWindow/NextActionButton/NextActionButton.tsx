// @flow
import * as React from "react";
import styles from "./NextActionButton.module.css";
import {actionOrder} from "../../../../../../server/constants/actionOrder";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import {formatToKebabCase} from "../../../../../../utils/formatToKebabCase";
import {IActionServiceRenderData} from "../../../../../../server/src/types/ActionService/ActionService";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    setNextAction: () => void;
    setNextPhase: () => void;
    actionService: IActionServiceRenderData;
};

export const NextActionButton = (props: Props) => {
    let currentActionIndex = actionOrder.findIndex(
        (action) => props.actionService.action === action
    );

    let nextActionIndex = currentActionIndex + 1;

    while (
        props.actionService.skippableActions.includes(actionOrder[nextActionIndex])
        ) {
        nextActionIndex++;
    }
    const nextAction =
        nextActionIndex < actionOrder.length
            ? actionOrder[nextActionIndex]
            : "next-turn";

    function clickHandle() {
        props.setNextAction();
    }

    return (
        <div className={styles.container} onClick={clickHandle}>
            <div className={styles.arrow}>
                <ResizableImage
                    src={redArrowImg}
                    alt={"Następna akcja"}
                />
            </div>
            <div className={styles.nextAction}>
                <ResizableImage
                    src={`/UI/actions/${formatToKebabCase(nextAction)}.png`}
                    alt={"Następna akcja"}
                />
            </div>
        </div>
    );
};
