import styles from "./Shortcut.module.css";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import shortcutImg from "/public/UI/tokens/shortcut.png";
import { Side } from "@shared/types/Game/TileService/TileResourceService";

interface Props {
	side: Side;
}

export function Shortcut(props: Props) {
	return (
		<div className={`${styles.container} ${styles[props.side]}`}>
			<ResizableImage src={shortcutImg} alt={"shortcut"} />
		</div>
	);
}
