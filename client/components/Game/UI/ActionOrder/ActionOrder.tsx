import redArrowImg from "/public/UI/misc/red-arrow.png";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import styles from "./ActionOrder.module.css";
import React from "react";
import {actionOrder} from "@shared/constants/actionOrder";
import {ActionTokens} from "@shared/types/Game/ActionService/ActionService";
import {ACTION} from "@shared/types/Game/ACTION";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import {IGlobalCostModifierRenderData} from "@shared/types/Game/ActionService/GlobalCostModifier";
import {capitalize, kebabCase} from "lodash";
import {getPropsComparator} from "../../../../utils/getPropsComparator";
import {useTranslation} from "react-i18next";

type Props = {
    adventureTokens: ActionTokens;
    reRollTokens: ActionTokens;
    globalCostModifiers: Record<ACTION, IGlobalCostModifierRenderData[]>
    containerRef: React.RefObject<HTMLDivElement>
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
        let adventureTokenSrc = `/UI/actions/${kebabCase(action)}.png`;
        let reRollToken;
        if (isAdventureAction(action)) {
            if (props.adventureTokens[action]) {
                adventureTokenSrc = `/UI/tokens/adventure/${action}.png`;
            }

            if (props.reRollTokens[action]) {
                reRollToken = (
                    <div className={styles.token}>
                        <ResizableImage
                            src={reRollTokenImg}
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

    const {t} = useTranslation();

    return (
        <div className={styles.container} ref={props.containerRef}>
            <div className={styles.label}>{capitalize(t("other.action order"))}</div>
            {actionIcons}
        </div>
    );
}

export default React.memo(ActionOrder, getPropsComparator(["containerRef"]));

