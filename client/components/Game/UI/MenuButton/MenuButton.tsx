import gear from "/public/UI/misc/gear.png";
import styles from "./Menu.module.css";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import Link from "next/link";

export function MenuButton() {
    return <div className={styles.container}>
        <Link href={"./"}>
            <div className={styles.button}>
                <ResizableImage src={gear} alt={"dd"}/>
            </div>
        </Link>
    </div>
}
