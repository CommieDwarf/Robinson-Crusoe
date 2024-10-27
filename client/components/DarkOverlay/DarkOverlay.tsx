import styles from "./DarkOverlay.module.css";



interface Props {
    blockPointerEvents?: boolean
}

export function DarkOverlay(props: Props) {

    return <div className={`${styles.container} ${props.blockPointerEvents && styles.blockPointerEvents}`}/>
}