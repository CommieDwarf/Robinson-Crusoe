// @flow
import * as React from "react";
import { ITokenRenderData } from "../../../../../interfaces/TokenService/Token";
import styles from "./Token.module.css";
import Image from "next/image";
import { useRef } from "react";
import { getImgName } from "../../../../../utils/getImgName";

type Props = {
  token: ITokenRenderData;
  mouseEnterToken: (token: ITokenRenderData, offsetLeft: number) => void;
  mouseLeaveToken: () => void;
};

export const Token = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (ref.current) {
      props.mouseEnterToken(
        props.token,
        ref.current?.offsetLeft + ref.current.offsetWidth / 2
      );
    }
  }

  return (
    <div
      className={styles.container}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseOutCapture={props.mouseLeaveToken}
    >
      <div className={styles.token}>
        <Image
          src={`/UI/tokens/discovery/${getImgName(props.token.name)}.png`}
          fill
          alt={"token"}
          sizes={styles.token}
        />
      </div>
    </div>
  );
};
