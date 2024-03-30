import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import RollDiceAnimation from "../../RollDiceAnimation/RollDiceAnimation";
import Entries from "@shared/types/Entries";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {IResolvableItemRenderData} from "@shared/types/Game/ActionService/IResolvableItem";
import {ActionDice, ActionDiceResults} from "@shared/types/Game/RollDice/RollDice";

type Props = {
    resolvableItem: IResolvableItemRenderData | null;
    type: AdventureAction;
    setItemAnimationDone: (id: string) => void;
    reRollClicked: boolean;
    reRoll: (dice: ActionDice) => void;
    reRolledDice: ActionDice | null;
};
export const RollDiceWindow = (props: Props) => {
    return (
        <div className={styles.container}>
            {props.resolvableItem && props.resolvableItem.rollDiceResults && (
                <RollDiceAnimation
                    name={props.resolvableItem.id}
                    results={
                        new Map(
                            Object.entries(
                                props.resolvableItem.rollDiceResults
                            ) as Entries<ActionDiceResults>
                        )
                    }
                    type={props.type}
                    onFinish={props.setItemAnimationDone}
                    reRolledDice={props.reRolledDice}
                    fixed={props.reRollClicked}
                    reRoll={props.reRoll}
                />
            )}
        </div>
    );
};
