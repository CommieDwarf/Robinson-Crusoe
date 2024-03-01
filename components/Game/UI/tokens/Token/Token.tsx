// @flow
import * as React from "react";
import {ITokenRenderData} from "../../../../../interfaces/TokenService/Token";
import styles from "./Token.module.css";
import Image from "next/image";
import {formatToKebabCase} from "../../../../../utils/formatToKebabCase";
import {objectsEqual} from "../../../../../utils/objectsEqual";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

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
                src={`/UI/tokens/discovery/${formatToKebabCase(props.token.name)}.png`}
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
