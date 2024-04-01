import styles from "./Expendables.module.css";
import {Expendable} from "./Expendable/Expendable/Expendable";


interface Props {
    determination: number;
    weapon: number;
}

export function Expendables(props: Props) {


    return <div className={styles.container}>
        <Expendable type={"weapon"} value={props.weapon}/>
        <Expendable type={"determination"} value={props.determination}/>
    </div>
}
