import { BackButton } from "../../components/BackButton/BackButton";
import styles from "./index.module.css";




export default function Custom404() {



    return <div className={styles.container}>
        <div className={styles.backButton}>
            <BackButton/>
        </div>
        <h1>404 - Nie znaleziono strony!</h1>
    </div>
}