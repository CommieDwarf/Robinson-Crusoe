import React, {useState} from "react";
import styles from "./Tokens.module.css";
import scrollbarStyles from "./Scollbar.module.css";
import Scrollbar from "../Scrollbar";
import {ITokenRenderData} from "../../../../interfaces/TokenService/Token";
import {Token} from "./Token/Token";
import {ContextMenu} from "./ContextMenu/ContextMenu";

interface Props {
  discoveryTokens: ITokenRenderData[];
  utilizeToken: (id: string) => void;
  menuDisabled: boolean;
}

export default function Tokens(props: Props) {
  const [mouseOverToken, setMouseOverToken] = useState(false);
  const [mouseOverMenu, setMouseOverMenu] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedToken, setSelectedToken] = useState<null | ITokenRenderData>(
      null
  );
  const [contextMenuLeft, setContextMenuLeft] = useState(0);

  function mouseScroll(value: number) {
    setScrollLeft(value);
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
        <Scrollbar styleModule={scrollbarStyles} setScrollLeft={mouseScroll}>
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
        </Scrollbar>
      </div>
  );
}
