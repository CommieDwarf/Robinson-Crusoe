import styles from "./PlayerLatency.module.css";


interface Props {
    latency: number | null;
}

export function PlayerLatency(props: Props) {

    const bars = [1, 2, 3];


    let latencyValue: string;
    if (props.latency === null) {
        latencyValue = "offline"
    } else if (props.latency <= 60) {
        latencyValue = "low"
    } else if (props.latency <= 100) {
        latencyValue = "medium"
    } else {
        latencyValue = "high"
    }

    const segment = 100 / bars.length;

    return <div className={styles.container}>
        {bars.map((num) => {
            const style = {
                height: segment * num + "%",
            };
            const grayedOut = (num === 3 && latencyValue === "medium") || (num >= 2 && latencyValue === "high");
            return <div className={`${styles.bar} ${styles[latencyValue]} ${grayedOut && styles.grayedOut}`}
                        style={style}
                        key={num}></div>
        })}
    </div>
}
