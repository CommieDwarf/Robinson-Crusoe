import React from "react";
import styles from "./Cards.module.css";
import { objectsEqual } from "@shared/utils/objectsEqual";
import { Tab } from "../CardList";
import { Card } from "./Card/Card";
import { useAppSelector } from "../../../../../store/hooks";
import {
	selectEquipmentService,
	selectInventionService,
	selectMysteryService,
	selectResourceService,
} from "../../../../../reduxSlices/gameSession";
import { createSelector } from "reselect";
import { RootState } from "../../../../../store/store";
import { dimensions } from "../dimensions";

const selectCards = createSelector(
	[
		(state: RootState) => selectInventionService(state)?.inventions,
		(state: RootState) => selectMysteryService(state)?.cardsAsReminders,
		(state: RootState) => selectResourceService(state)?.owned.treasures,
		(state: RootState) => selectEquipmentService(state)?.items,
	],
	(inventions, mysteryReminderCards, mysteryTreasures, items) => {
		return {
			inventions,
			mysteryCards: mysteryReminderCards &&
				mysteryTreasures && [
					...mysteryReminderCards,
					...mysteryTreasures,
				],
			items,
		};
	}
);

interface Props {
	tab: Tab;
	isBeingDragged: boolean;
	topLayerElement: string;
	topLayer: boolean;
	scrollTop: number;
	containerWidth: number;
}

function Cards(props: Props) {
	const cards = useAppSelector((state) => {
		return selectCards(state);
	});

	const cardsSelected = cards[props.tab];
	const totalWidth = props.containerWidth - dimensions.scrollbar;
	const cardWidth = totalWidth / 4;
	const cardHeight = cardWidth / dimensions.cardAspectRatio;

	const cardElements = cardsSelected?.map((card, i) => {
		const column = Math.ceil(i  % dimensions.cardsPerRow);
		const row = Math.floor(i / dimensions.cardsPerRow);

		return (
			<Card
				top={props.scrollTop}
				column={column}
				row={row}
				card={card}
				key={card.name}
				zIndexIncreased={props.topLayerElement.includes(card.name)}
				height={cardHeight}
				width={cardWidth}
				totalWidth={totalWidth}
			/>
		);
	});

	return (
		<div
			className={`${styles.container} ${
				props.topLayer && styles.zIndexIncreased
			}`}
		>
			{cardElements}
		</div>
	);
}

export default React.memo(Cards, objectsEqual);
