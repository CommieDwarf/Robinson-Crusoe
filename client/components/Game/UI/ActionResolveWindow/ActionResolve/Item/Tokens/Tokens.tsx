// @flow
import * as React from "react";
import styles from "./Tokens.module.css";
import reRollTokenImg from "/public/UI/tokens/reroll.webp";
import ResizableImage from "../../../../../../DynamicImage/DynamicImage";
import {ACTION} from "@shared/types/Game/ACTION";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import {ActionTokens} from "@shared/types/Game/ActionService/ActionService";

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
                    <ResizableImage
                        src={reRollTokenImg}
                        alt={"przerzut sukcesu"}
                    />
                </div>
            )}
            {isAdventureAction(props.action) && props.adventureTokens[props.action] && (
                <div className={styles.token}>
                    <ResizableImage
                        src={`/UI/tokens/adventure/${props.action}.webp`}
                        alt={"przerzut sukcesu"}
                    />
                </div>
            )}
        </div>
    );
};
