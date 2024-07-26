// @flow
import * as React from "react";
import styles from "./ReRollButton.module.css";
import {IActionServiceRenderData} from "@shared/types/Game/ActionService/ActionService";
import {ACTION} from "@shared/types/Game/ACTION";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";
import {getCharacterRerollAbility} from "../getReRollAbility";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";

type Props = {
    actionService: IActionServiceRenderData;
    onReRollButtonClick: () => void;
    currentAction: ACTION;
};
export const ReRollButton = (props: Props) => {
    let character = props.actionService.lastRolledItem?.leaderPawn.owner;
    let reRollAbility = character ? getCharacterRerollAbility(character) : undefined;
    const {t} = useTranslation();

    function handleClick() {
        props.onReRollButtonClick();
    }

    return (
        <div className={styles.container}>
            {reRollAbility && character && (props.currentAction === reRollAbility.actionAllowed) && (
                <>
                    {/*@ts-ignore*/}
                    <div>{capitalize(t(`ability.${reRollAbility.name}.name`))}</div>
                    <div
                        className={`${styles.button} ${
                            character.determination > reRollAbility.cost ? styles.buttonClickable : ""
                        }`}
                        onClick={handleClick}
                    >
                        {insertIconsIntoText(
                            `Przerzuć (${reRollAbility.cost} $determination$)`,
                            styles.icon
                        )}
                    </div>
                </>
            )}
        </div>
    );
};



