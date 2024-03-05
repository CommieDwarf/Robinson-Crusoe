import type {NextPage} from "next";
import "../I18n/I18n";
import Link from "next/link";
import styles from "./index.module.css";

const Home: NextPage = () => {


    return (
        <div className={styles.container}>
            <h1>Tu Będzie kiedyś menu</h1>
            <Link href={"./Play"}>Graj</Link>
        </div>
    );
};

export default Home;
