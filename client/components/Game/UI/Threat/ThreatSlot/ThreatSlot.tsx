import { IEventCardRenderData } from "@shared/types/Game/EventService/EventCard";
import styles from "./ThreatSlot.module.css";
import CommittedResources from "../../CommittedResources/CommittedResources";
import CardSlot from "./CardSlot/CardSlot";
import getActionSlots from "../../getActionSlots";
import { Side } from "@shared/types/Game/TileService/TileResourceService";

interface Props {
	card: IEventCardRenderData | null;
	side: Side;
}

export function ThreatSlot(props: Props) {
	return (
		<div className={styles.container}>
			<div className={styles.cardSlot}>
				<CardSlot card={props.card} slot={"left"} />
			</div>
			<div className={styles.committedResources}>
				{props.card?.committedResources && (
					<CommittedResources
						committedResources={props.card.committedResources}
						personalResourceUsed={props.card.personalResourceUsed}
						background={true}
						justifyContent={"center"}
					/>
				)}
			</div>
			<div className={styles.actionSlots}>
				{props.card && getActionSlots(props.card, 0, props.side)}
			</div>{" "}
		</div>
	);
}
