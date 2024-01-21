import styles from "./Record.module.css";
import Image from "next/image";
import leatherImg from "/public/UI/resources/leather.png";
import woodImg from "/public/UI/resources/wood.png";

interface Props {
    value: number,
    type: "leather" | "wood"
}

export function Record(props: Props) {

    return <div className={styles.container}>
        <div className={styles.value}>
            {props.value}
        </div>
        <div className={styles.icon}>
            <Image src={props.type === "leather" ? leatherImg : woodImg} alt={props.type} fill></Image>
        </div>
    </div>
}
