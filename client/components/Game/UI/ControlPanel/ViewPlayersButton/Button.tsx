import styles from "./ViewPlayersButton.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import playersIconImg from "/public/UI/icons/players.png";
import {StaticImageData} from "next/image";

export interface Props {
    onClick: () => void;
    imgSrc: string | StaticImageData;
}


export function ViewPlayersButton(props: Props) {


    function handleClick() {
        props.onClick();
    }


    return <div className={styles.container} onClick={handleClick}>
        <div className={styles.imgWrapper}>
            <ResizableImage src={props.imgSrc} alt={"button"}/>
        </div>
    </div>

}
