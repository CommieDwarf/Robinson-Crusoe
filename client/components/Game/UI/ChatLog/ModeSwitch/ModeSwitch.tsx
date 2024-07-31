import styles from "./ModeSwitch.module.css";

interface Props {
    logMode: boolean;
    switchMode: () => void;
    unreadMessages: {
        log: boolean,
        chat: boolean,
    }
}


export function ModeSwitch(props: Props) {

    function handleClick() {
        props.switchMode();
    }


    return <div className={styles.container} onClick={handleClick}>
        <div
            className={`${styles.tab} ${styles.topTab} ${!props.logMode && styles.current} ${props.unreadMessages.chat && styles.unread}`}>
            <span className={styles.label}>Chat</span>
        </div>
        <div
            className={`${styles.tab} ${styles.bottomTab} ${props.logMode && styles.current} ${props.unreadMessages.log && styles.unread}`}>
            <span className={styles.label}>Log</span>
        </div>
    </div>
}
