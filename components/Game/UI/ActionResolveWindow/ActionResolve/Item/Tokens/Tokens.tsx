// @flow
import * as React from "react";
import styles from "./Tokens.module.css";
import {ActionTokens} from "../../../../../../../interfaces/ActionService/ActionService";
import {isAdventureAction} from "../../../../../../../utils/isAdventureAction";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import Image from "next/image";
import {ACTION} from "../../../../../../../interfaces/ACTION";

type Props = {
    action: ACTION;
    reRollTokens: ActionTokens;
    adventureTokens: ActionTokens;
};
export const Tokens = (props: Props) => {
    return (
        <div className={styles.container}>
            {isAdventureAction(props.action) && props.reRollTokens[props.action] && (
                <div className={styles.token}>
                    <Image
                        src={reRollTokenImg}
                        sizes={styles.token}
                        alt={"przerzut sukcesu"}
                        fill
                    />
                </div>
            )}
            {isAdventureAction(props.action) && props.adventureTokens[props.action] && (
                <div className={styles.token}>
                    <Image
                        src={`/UI/tokens/adventure/${props.action}.png`}
                        sizes={styles.token}
                        alt={"przerzut sukcesu"}
                        fill
                    />
                </div>
            )}
        </div>
    );
};
