import Image from "next/image";
import React from "react";
import styles from "./ActionOrder.module.css";
import {actionOrder} from "../../../../constants/actionOrder";
import {formatToKebabCase} from "../../../../utils/formatToKebabCase";
import redArrowImg from "/public/UI/misc/red-arrow.png";

import reRollImg from "/public/UI/tokens/reroll.png";
import {ActionTokens, GlobalCostModifiers} from "../../../../interfaces/ActionService/ActionService";
import {isAdventureAction} from "../../../../utils/isAdventureAction";
import {objectsEqual} from "../../../../utils/objectsEqual";
import {ACTION} from "../../../../interfaces/ACTION";
import {IGlobalCostModifierRenderData} from "../../../../interfaces/ActionService/GlobalCostModifier";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";

interface Props {
    adventureTokens: ActionTokens;
    reRollTokens: ActionTokens;
    globalCostModifiers: Record<ACTION, IGlobalCostModifierRenderData[]>;
}

function ActionOrder(props: Props) {
    let actionIcons: JSX.Element[] = [];

    actionOrder.forEach((action, i) => {
        if (i > 0) {
            actionIcons.push(
                <div className={styles.redArrow} key={i}>
                    <ResizableImage
                        src={redArrowImg}
                        alt="strzałka"
                    />
                </div>
            );
        }
        let adventureTokenSrc = `/UI/actions/${formatToKebabCase(action)}.png`;
        let reRollToken;
        if (isAdventureAction(action)) {
            if (props.adventureTokens[action]) {
                adventureTokenSrc = `/UI/tokens/adventure/${action}.png`;
            }

            if (props.reRollTokens[action]) {
                reRollToken = (
                    <div className={styles.token}>
                        <ResizableImage
                            src={reRollImg}
                            alt={"reroll"}
                            className={styles.reRoll}
                        />
                    </div>
                );
            }
        }
        let timeConsumingActionIcon;
        if (props.globalCostModifiers[action].some((modifier) => modifier.resource === "helper")) {
            timeConsumingActionIcon = <div className={styles.token}>
                <ResizableImage
                    src={timeConsumingActionToken}
                    alt={"wymagany dodatkowy pionek"}
                />
            </div>
        }
        actionIcons.push(
            <div className={styles.actionIcon} key={i + 100}>
                <ResizableImage
                    src={adventureTokenSrc}
                    alt={action}
                />
                <div className={styles.tokens}>
                    {reRollToken}
                    {timeConsumingActionIcon}
                </div>

            </div>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.label}>Kolejność akcji</div>
            {actionIcons}
        </div>
    );
}

export default React.memo(ActionOrder, objectsEqual);
