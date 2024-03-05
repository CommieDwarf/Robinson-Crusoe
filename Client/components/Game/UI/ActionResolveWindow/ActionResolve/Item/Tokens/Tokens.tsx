// @flow
import * as React from "react";
import styles from "./Tokens.module.css";
import {ActionTokens} from "../../../../../../../../interfaces/ActionService/ActionService";
import {isAdventureAction} from "../../../../../../../../utils/typeGuards/isAdventureAction";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import Image from "next/image";
import {ACTION} from "../../../../../../../../interfaces/ACTION";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";

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
                        src={`/UI/tokens/adventure/${props.action}.png`}
                        alt={"przerzut sukcesu"}
                    />
                </div>
            )}
        </div>
    );
};
