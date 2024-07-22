import styles from "../play/index.module.css";
import compassImg from "/public/UI/tokens/compass.png";
import * as React from "react";
import {NextPage} from "next";
import Image from "next/image";

const Loading: NextPage = () => {


    return (<div className={styles.placeholder}>
                    <span className={styles.placeHolderText}>
                        <h1>Ładowanie...</h1>
                    </span>
        <div className={styles.tokenImg}>
            <Image src={compassImg} alt={""} fill sizes={"100px"}/>
        </div>
    </div>)
}

export default Loading
