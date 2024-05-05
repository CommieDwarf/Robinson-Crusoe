import redArrowImg from "/public/UI/misc/red-arrow.png";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import styles from "./ActionOrder.module.css";
import React from "react";
import {actionOrder} from "@shared/constants/actionOrder";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import {capitalize, kebabCase} from "lodash";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

type Props = {
    actionOrderContainerRef: React.RefObject<HTMLDivElement>
}

export default function ActionOrder(props: Props) {
    let actionIcons: JSX.Element[] = [];

    const tokenModifiers = useAppSelector((state) => {
        const actionService = selectGame(state).actionService!;
        return {
            adventure: actionService.adventureTokens,
            reRoll: actionService.reRollTokens,
            globalCostModifiers: actionService.globalCostModifiers,
        }
    })


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
            if (tokenModifiers.adventure[action]) {
                adventureTokenSrc = `/UI/tokens/adventure/${action}.png`;
            }

            if (tokenModifiers.reRoll[action]) {
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
        if (tokenModifiers.globalCostModifiers[action].some((modifier) => modifier.resource === "helper")) {
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
        <div className={styles.container} ref={props.actionOrderContainerRef}>
            <div className={styles.label}>{capitalize(t("other.action order"))}</div>
            {actionIcons}
        </div>
    );
}
