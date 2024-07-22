// @flow
import * as React from "react";
import styles from "./ResolveButtons.module.css"
import {CardResolveButtonProp} from "../CardResolve";
import {Button} from "./Button/Button";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";

type Props = {
    button1: CardResolveButtonProp,
    button2?: CardResolveButtonProp,
    color: PLAYER_COLOR,
};
export const ResolveButtons = (props: Props) => {


    return (
        <div className={styles.container}>
            <Button label={props.button1.label} triggerEffect={props.button1.triggerEffect}
                    locked={props.button1.locked} color={props.color}/>
            {props.button2 && <Button label={props.button2.label} triggerEffect={props.button2.triggerEffect}
                                      locked={props.button2.locked} color={props.color}/>}
        </div>
    );
};
