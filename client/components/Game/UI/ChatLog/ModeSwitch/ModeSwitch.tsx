import styles from "./ModeSwitch.module.css";

interface Props {
    logMode: boolean;
    switchMode: () => void;
}


export function ModeSwitch(props: Props) {

    function handleClick() {
        props.switchMode();
    }


    return <div className={styles.container} onClick={handleClick}>
        <div className={`${styles.tab} ${!props.logMode && styles.current}`}>Chat</div>
        <div className={`${styles.tab} ${props.logMode && styles.current}`}>Log</div>
    </div>
}
