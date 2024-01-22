import styles from "../Play/play.module.css";
import Image from "next/image";
import compassImg from "/public/UI/tokens/compass.png";
import * as React from "react";
import {NextPage} from "next";

const Loading: NextPage = () => {

    console.log("I EXIST U MOTHERFUCKERS!");

    return (<div className={styles.placeholder}>
                    <span className={styles.placeHolderText}>
                        <h1>Ładowanie...</h1>
                    </span>
        <div className={styles.tokenImg}>
            <Image src={compassImg} alt={""} fill/>
        </div>
    </div>)
}

export default Loading
