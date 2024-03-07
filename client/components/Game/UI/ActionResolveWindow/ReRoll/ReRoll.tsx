// @flow
import * as React from "react";
import styles from "./ReRoll.module.css";
import {IActionServiceRenderData} from "@shared/types/Game/ActionService/ActionService";
import {ACTION} from "@shared/types/Game/ACTION";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";

type Props = {
    actionService: IActionServiceRenderData;
    onReRollButtonClick: () => void;
};
export const ReRoll = (props: Props) => {
    let character = props.actionService.lastRolledItem?.leaderPawn.owner;
    let skill;
    let actionRestrict;

    if (character) {
        switch (character.name) {
            case "cook":
                skill = character.skills.find((skill) => skill.name === "scrounger");
                actionRestrict = ACTION.GATHER;
                break;
            case "friday":
                skill = character.skills.find((skill) => skill.name === "reRoll");
                actionRestrict = null;
                break;
        }
    }

    return (
        <div className={styles.container}>
            {skill && character && (props.actionService.action === actionRestrict || !actionRestrict) && (
                <>
                    <div>{skill.namePL}</div>
                    <div
                        className={`${styles.button} ${
                            character.determination > skill.cost ? styles.buttonClickable : ""
                        }`}
                        onClick={props.onReRollButtonClick}
                    >
                        {insertIconsIntoText(
                            `Przerzuć (${character?.determination}/${skill.cost})$determination$`,
                            styles.button
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
