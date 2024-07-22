import styles from "../ActionOrder.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import React from "react";
import {ACTION, AdventureAction} from "@shared/types/Game/ACTION";
import {kebabCase} from "lodash";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import {selectActionService} from "../../../../../reduxSlices/gameSession";
import {RootState} from "../../../../../store/store";
import {createSelector} from "reselect";
import {useAppSelector} from "../../../../../store/hooks";


interface Props {
    action: ACTION,
}


const selectTokensByAction = createSelector([
    (state: RootState) => selectActionService(state).adventureTokens,
    (state: RootState) => selectActionService(state).globalCostModifiers,
    (state: RootState) => selectActionService(state).reRollTokens,
    (state: RootState, action: ACTION) => action,
], (adventure, costModifier, reRoll, action) => {
    if (isAdventureAction(action)) {
        return {
            adventure: adventure[action],
            costModifier: costModifier[action],
            reRoll: reRoll[action],
        }
    } else {
        return null;
    }
})

export function ActionIcon(props: Props) {

    let adventureTokenSrc = `/UI/actions/${kebabCase(props.action)}.png`;
    let reRollToken;
    let timeConsumingActionIcon;


    const tokenModifiers = useAppSelector(state => selectTokensByAction(state, props.action))


    if (isAdventureAction(props.action) && tokenModifiers) {

        if (tokenModifiers.adventure) {
            adventureTokenSrc = `/UI/tokens/adventure/${props.action}.png`;
        }

        if (tokenModifiers.reRoll) {
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

        if (tokenModifiers.costModifier.some((modifier) => modifier.resource === "helper")) {
            timeConsumingActionIcon = <div className={styles.token}>
                <ResizableImage
                    src={timeConsumingActionToken}
                    alt={"wymagany dodatkowy pionek"}
                />
            </div>
        }
    }


    return <div className={styles.actionIcon}>
        <ResizableImage
            src={adventureTokenSrc}
            alt={props.action}
        />
        <div className={styles.tokens}>
            {reRollToken}
            {timeConsumingActionIcon}
        </div>

    </div>
}
