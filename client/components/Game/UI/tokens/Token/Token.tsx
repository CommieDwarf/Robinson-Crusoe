// @flow
import * as React from "react";
import {ITokenRenderData} from "@sharedTypes/TokenService/Token";
import styles from "./Token.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {kebabCase} from "lodash";
import {objectsEqual} from "@sharedUtils/objectsEqual";

type Props = {
    token: ITokenRenderData;
    mouseEnterToken: (token: ITokenRenderData, offsetLeft: number, locked: boolean) => void;
    mouseLeaveToken: () => void;

    locked: boolean;
};

const Token = (props: Props) => {
    function handleMouseEnter(event: React.MouseEvent) {
        const target = event.currentTarget as HTMLDivElement;
        props.mouseEnterToken(
            props.token,
            target.offsetLeft + target.offsetWidth / 2,
            props.locked
        );
    }

    return (
        <div
            className={`${styles.container} ${props.locked ? styles.locked : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseOutCapture={props.mouseLeaveToken}
        >
            <ResizableImage
                src={`/UI/tokens/discovery/${kebabCase(props.token.name)}.png`}
                fill
                alt={"token"}
                sizes={styles.token}
            />
        </div>
    );
};

function areEqual(prevProps: Props, nextProps: Props) {
    return objectsEqual(prevProps.token, nextProps.token);
}

export default React.memo(Token, areEqual);
