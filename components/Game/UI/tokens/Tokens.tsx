import React, {UIEventHandler, useEffect, useRef, useState} from "react";
import styles from "./Tokens.module.css";

import {ITokenRenderData} from "../../../../interfaces/TokenService/Token";
import Token from "./Token/Token";
import {ContextMenu} from "./ContextMenu/ContextMenu";
import {objectsEqual} from "../../../../utils/objectsEqual";

interface Props {
    discoveryTokens: ITokenRenderData[];
    utilizeToken: (id: string) => void;
    menuDisabled: boolean;
}

function Tokens(props: Props) {
    const [mouseOverToken, setMouseOverToken] = useState(false);
    const [mouseOverMenu, setMouseOverMenu] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedToken, setSelectedToken] = useState<null | ITokenRenderData>(
        null
    );
    const [contextMenuLeft, setContextMenuLeft] = useState(0);

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        setScrollLeft(event.currentTarget.scrollLeft);
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    function handleWheel(event: React.WheelEvent) {
        event.preventDefault()
        if (!scrollRef.current) {
            return;
        }
        const containerScrollPosition = scrollRef.current.scrollLeft;
        scrollRef.current.scrollTo({
            top: 0,
            left: containerScrollPosition + event.deltaY,
            behavior: 'smooth'
        })
    }


    function mouseEnterToken(token: ITokenRenderData, menuLeft: number) {
        setSelectedToken(token);
        setMouseOverToken(true);
        setContextMenuLeft(menuLeft);
    }

    function mouseLeaveToken() {
        setMouseOverToken(false);
    }

    function mouseEnterMenu() {
        setMouseOverMenu(true);
    }

    function mouseLeaveMenu() {
        setMouseOverMenu(false);
    }

    // TODO: make setSelectedToken(null) only when token have been used.
    function utilizeToken(id: string) {
        setSelectedToken(null);
        props.utilizeToken(id);
    }

    return (
        <div className={styles.container}>
            {(mouseOverToken || mouseOverMenu) &&
                selectedToken &&
                !props.menuDisabled && (
                    <ContextMenu
                        left={contextMenuLeft - scrollLeft}
                        mouseEnterMenu={mouseEnterMenu}
                        mouseLeaveMenu={mouseLeaveMenu}
                        token={selectedToken}
                        utilizeToken={utilizeToken}
                    />
                )}
            <div className={styles.scroll} onScroll={handleScroll} onWheel={handleWheel} ref={scrollRef}>
                <div className={styles.content}>
                    {props.discoveryTokens.map((token, i) => {
                        return (
                            <Token
                                key={i}
                                token={token}
                                mouseEnterToken={mouseEnterToken}
                                mouseLeaveToken={mouseLeaveToken}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Tokens, objectsEqual);
