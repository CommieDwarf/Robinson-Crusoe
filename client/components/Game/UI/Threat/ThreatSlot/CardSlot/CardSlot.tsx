import React, { useEffect, useRef, useState } from "react";
import styles from "./CardSlot.module.css";

import { kebabCase } from "lodash";
import { IEventCardRenderData } from "@shared/types/Game/EventService/EventCard";
import ResizableImage from "../../../../../DynamicImage/DynamicImage";
import { Side } from "@shared/types/Game/TileService/TileResourceService";
import { getObjectsComparator } from "../../../../../../utils/getObjectsComparator";

interface Props {
	card: IEventCardRenderData | null;
	slot?: Side;
}

export function CardSlot(props: Props) {
	const [enlarged, setEnlarged] = useState(false);
	const cardContainerRef = useRef<HTMLDivElement>(null);
	const beenEnlarged = useRef(false);

	function handleClick() {
		if (!props.card) {
			return;
		}
		setEnlarged((prev) => !prev);
	}

	useEffect(() => {
		if (props.slot === "right" && props.card && !beenEnlarged.current) {
			setEnlarged(true);
			beenEnlarged.current = true;
		}
		if (!props.card) {
			beenEnlarged.current = false;
		}
	}, [props.card, props.slot]);

	const enlargedClass = enlarged && props.card ? styles.cardEnlarged : "";

	const zIndexClass = enlarged
		? styles.zIndexIncreased
		: styles.zIndexTransition;

	return (
		<div
			className={`${styles.container} ${enlargedClass} ${zIndexClass}`}
			onClick={handleClick}
		>
			{props.card && (
				<div className={styles.imgWrapper} ref={cardContainerRef}>
					<ResizableImage
						src={`/UI/cards/event/${kebabCase(
							props.card.name
						)}.webp`}
						alt={props.card.name}
						scale={4}
					/>
				</div>
			)}
		</div>
	);
}

export default React.memo(CardSlot, getObjectsComparator());
