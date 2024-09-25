import styles from "./Button.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {StaticImageData} from "next/image";

export interface Props {
    onClick: () => void;
    imgSrc: string | StaticImageData;
    borderless?: boolean;
    filterColor?: boolean;
}


export function Button(props: Props) {


    function handleClick() {
        props.onClick();
    }


    return <div className={`${styles.container} ${props.borderless && styles.containerBorderless}`}
                onClick={handleClick}>
        <div className={`${styles.imgWrapper} ${props.filterColor && styles.filter}`}>
            <ResizableImage src={props.imgSrc} alt={"button"}/>
        </div>
    </div>

}
