// @flow
import * as React from "react";
import styles from "./ReRoll.module.css";
import {IActionServiceRenderData} from "@shared/types/Game/ActionService/ActionService";
import {ACTION} from "@shared/types/Game/ACTION";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {IAbilityRenderData} from "@shared/types/Game/Skill/IAbility";

type Props = {
    actionService: IActionServiceRenderData;
    onReRollButtonClick: () => void;
    currentAction: ACTION;
};
export const ReRoll = (props: Props) => {
    let character = props.actionService.lastRolledItem?.leaderPawn.owner;
    let reRollAbility = character ? getCharacterRerollAbility(character) : undefined;
    return (
        <div className={styles.container}>
            {reRollAbility && character && (props.currentAction === reRollAbility.actionAllowed) && (
                <>
                    <div>{reRollAbility.name}</div>
                    <div
                        className={`${styles.button} ${
                            character.determination > reRollAbility.cost ? styles.buttonClickable : ""
                        }`}
                        onClick={props.onReRollButtonClick}
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


export function getCharacterRerollAbility(character: { abilities: IAbilityRenderData[], name: CHARACTER }): IAbilityRenderData | undefined {
    switch (character.name) {
        case CHARACTER.COOK:
            return character.abilities.find((ab) => ab.name === ABILITY.SCROUNGER);
        case CHARACTER.FRIDAY:
            return character.abilities.find((ab) => ab.name === ABILITY.FRIDAYS_ABILITY);
        case CHARACTER.CARPENTER:
            return character.abilities.find((ab) => ab.name === ABILITY.CRAFTSMANSHIP);
        case CHARACTER.EXPLORER:
            return character.abilities.find((ab) => ab.name === ABILITY.LUCKY);
        default:
            return undefined;
    }
}
