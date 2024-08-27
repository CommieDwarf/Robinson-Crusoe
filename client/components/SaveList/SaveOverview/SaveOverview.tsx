import styles from "./SaveOverview.module.css";
import {SaveOverview} from "@shared/types/SaveGame";
import ResizableImage from "../../ResizableImage/ResizableImage";
import playersIconImg from "/public/UI/icons/players.png";


interface Props {
    save: SaveOverview;
    index: number;
    onClick: (saveId: string) => void;
    selected: boolean;
}


export function SaveOverview(props: Props) {

    const date = new Date(props.save.timestamp);

    function handleClick() {
        props.onClick(props.save.id)
    }


    return <div className={`${styles.container} ${props.selected && styles.containerSelected} nonSelectable`}
                onClick={handleClick}>
        <div className={styles.index}>{props.index}.</div>
        <div className={styles.name}>{props.save.name}</div>
        <div className={styles.scenario}>{props.save.scenario}</div>
        <div className={styles.playerAmount}>
            <span>{`${props.save.playerAmount}/${props.save.maxPlayers}`}</span>
            <div className={`${styles.playersIcon} ${props.selected && styles.playersIconSelected}`}>
                <ResizableImage
                    src={playersIconImg} alt={"players"}
                />
            </div>
        </div>
        <div className={styles.date}>{formatter.format(date)}</div>
    </div>
}

const formatter = new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});
