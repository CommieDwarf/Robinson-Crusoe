import styles from "./CostBlock.module.css";
import lineImg from "/public/UI/misc/line.png";

import {Record} from "./Record/Record";
import Image from "next/image";

interface ResourceCost {
    type: "leather" | "wood",
    amount: number,
}

interface Props {
    resource1: ResourceCost | null,
    resource2: ResourceCost | null,
}

export function CostBlock(props: Props) {


    return <div className={styles.container}>
        {props.resource1 &&
            <div className={`${styles.resource1} ${styles.resource}`}>
                <Record value={props.resource1.amount} type={props.resource1.type}/>
            </div>}
        {props.resource2 &&
            <div className={styles.slash}>
                <Image src={lineImg} alt={"line"} fill>

                </Image>

            </div>
        }
        {props.resource2 &&
            <div className={`${styles.resource2} ${styles.resource}`}>
                <Record value={props.resource2.amount} type={props.resource2.type}/>
            </div>
        }
    </div>
}
