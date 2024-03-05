import styles from "./Record.module.css";
import Image from "next/image";
import leatherImg from "/public/UI/resources/leather.png";
import woodImg from "/public/UI/resources/wood.png";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";

interface Props {
    value: number,
    type: "leather" | "wood"
    canAfford: boolean,
    committed: boolean,
}

export function Record(props: Props) {

    return <div className={`${styles.container} ${props.canAfford || props.committed ? "" : styles.cantAfford}`}>
        <div className={styles.value}>
            {props.value}
        </div>
        <div className={`${styles.icon} ${props.type === "wood" ? styles.iconWood : ""}`}>
            <ResizableImage src={props.type === "leather" ? leatherImg : woodImg} alt={props.type} fill/>
        </div>
    </div>
}
