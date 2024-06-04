import styles from "./BackButton.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import exitIcon from "/public/UI/icons/exit4.png";

interface Props {
    url?: string;
}

export function BackButton(props: Props) {
    return <div className={styles.container}>
        <Link href={props.url || "./"}>
            <div className={styles.imgWrapper}>
                <ResizableImage src={exitIcon} alt={"dd"}/>
            </div>
        </Link>
    </div>
}
