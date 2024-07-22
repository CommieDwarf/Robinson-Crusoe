import styles from "./ViewPlayersButton.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import playersIconImg from "/public/UI/icons/players.png";

export interface Props {
    onClick: () => void;
}


export function ViewPlayersButton(props: Props) {


    function handleClick() {
        props.onClick();
    }


    return <div className={styles.container} onClick={handleClick}>
        <div className={styles.imgWrapper}>
            <ResizableImage src={playersIconImg} alt={"players"}/>

        </div>
    </div>

}
