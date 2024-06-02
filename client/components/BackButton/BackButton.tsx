import styles from "./BackButton.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import exitIcon from "/public/UI/icons/exit4.png";


export function BackButton() {
    return <div className={styles.container}>
        <Link href={"./"}>
            <div className={styles.imgWrapper}>
                <ResizableImage src={exitIcon} alt={"dd"}/>
            </div>
        </Link>
    </div>
}
