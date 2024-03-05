// @flow
import * as React from "react";
import magnifyingGlassImg from "/public/UI/misc/magnifying-glass.png";
import styles from "./ZoomButton.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    onClick: () => void;
    cardType: "mystery" | "adventure";
};
export const ZoomButton = (props: Props) => {
    return (
        <div
            className={`${styles.container} ${styles[props.cardType]}`}
            onClick={props.onClick}
        >
            <div className={styles.magnifyingGlass}>
                <ResizableImage
                    src={magnifyingGlassImg}
                    alt={"powiększ"}
                    sizes={styles.magnifyingGlass}
                    fill
                    unselectable={"on"}
                    draggable={"false"}
                />
            </div>
        </div>
    );
};
