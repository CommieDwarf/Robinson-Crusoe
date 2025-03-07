import styles from "./BackButton.module.css";
import ResizableImage from "../DynamicImage/DynamicImage";
import Link from "next/link";
import exitIcon from "/public/UI/icons/exit4.webp";

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
