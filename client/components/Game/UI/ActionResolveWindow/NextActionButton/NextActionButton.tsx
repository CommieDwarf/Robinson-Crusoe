// @flow
import * as React from "react";
import styles from "./NextActionButton.module.css";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {actionOrder} from "@shared/constants/actionOrder";
import {kebabCase} from "lodash";
import {IActionServiceRenderData} from "@shared/types/Game/ActionService/ActionService";

type Props = {
    setNextAction: () => void;
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
                    src={`/UI/actions/${kebabCase(nextAction)}.png`}
                    alt={"Następna akcja"}
                />
            </div>
        </div>
    );
};
