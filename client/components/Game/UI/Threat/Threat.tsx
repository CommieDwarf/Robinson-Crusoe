import React from "react";
import styles from "./Threat.module.css";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { getObjectsComparator } from "../../../../utils/getObjectsComparator";
import { RootState } from "../../../../store/store";
import { connect } from "react-redux";
import { IEventCardRenderData } from "@shared/types/Game/EventService/EventCard";
import { ThreatSlot } from "./ThreatSlot/ThreatSlot";
import redArrowImg from "/public/UI/misc/red-arrow.webp";
import DynamicImage from "components/DynamicImage/DynamicImage";

interface StateProps {
	leftSlot: IEventCardRenderData | null;
	rightSlot: IEventCardRenderData | null;
}

interface Props {
	topLayer: boolean;
}

function Threat(props: StateProps & Props) {
	return (
		<div
			className={`${styles.container} ${
				props.topLayer && styles.zIndexIncreased
			} tour-threat`}
		>
			<div className={styles.threatSlot}>
				<ThreatSlot card={props.leftSlot} side="left" />
			</div>
			<div className={styles.arrow}>
				<DynamicImage src={redArrowImg} alt="" sizes={styles.arrow} />
			</div>
			<div className={styles.threatSlot}>
				<ThreatSlot card={props.rightSlot} side="right" />
			</div>
		</div>
	);
}

const mapStateToProps = (state: RootState, props: Props) => {
	const game = selectGame(state);
	return {
		leftSlot: game?.eventService.leftSlot || null,
		rightSlot: game?.eventService.rightSlot || null,
		...props,
	};
};

export default connect(mapStateToProps)(
	React.memo(Threat, getObjectsComparator())
);
