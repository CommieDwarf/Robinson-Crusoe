import { GUIDE_CONTENT } from "../Contents";
import styles from "./ListItem.module.css";

interface Props {
    selected: boolean;
    content: GUIDE_CONTENT;
    onClick: (content: GUIDE_CONTENT) => void;
}


export function ListItem(props: Props) {

    function handleClick() {
        props.onClick(props.content);
    }



    return <li className={styles.container} onClick={handleClick}>
        <span className={`${styles.content} ${props.selected && styles.selected}`}>
        {props.content}

        </span>
        
        </li>
}