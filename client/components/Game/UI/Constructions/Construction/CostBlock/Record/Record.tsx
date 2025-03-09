import styles from "./Record.module.css";
import leatherImg from "/public/UI/resources/leather.webp";
import woodImg from "/public/UI/resources/wood.webp";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";

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
            <DynamicImage src={props.type === "leather" ? leatherImg : woodImg} alt={props.type} fill/>
        </div>
    </div>
}
