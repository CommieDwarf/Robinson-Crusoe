// @flow
import * as React from "react";
import {ITokenRenderData} from "../../../../../interfaces/TokenService/Token";
import styles from "./Token.module.css";
import Image from "next/image";
import {getImgName} from "../../../../../utils/getImgName";
import {objectsEqual} from "../../../../../utils/objectsEqual";

type Props = {
    token: ITokenRenderData;
    mouseEnterToken: (token: ITokenRenderData, offsetLeft: number) => void;
    mouseLeaveToken: () => void;
};

const Token = (props: Props) => {
    function handleMouseEnter(event: React.MouseEvent) {
        const target = event.currentTarget as HTMLDivElement;
        props.mouseEnterToken(
            props.token,
            target.offsetLeft + target.offsetWidth / 2
        );
    }

    return (
        <div
            className={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseOutCapture={props.mouseLeaveToken}
        >
            <Image
                src={`/UI/tokens/discovery/${getImgName(props.token.name)}.png`}
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
