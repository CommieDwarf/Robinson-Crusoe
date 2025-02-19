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
	let cardsSelected = cards[props.tab];
	let column = -1;
	let row = -1;
	const aspectRatio = 0.654;
	const tabsHeight = 20;
	const scrollbar = 20;
	const totalWidth = props.containerWidth - scrollbar;
	const cardWidth = totalWidth / 4;
	const cardHeight = cardWidth / aspectRatio;

	const maxColumns = 4;

	const cardElements = cardsSelected?.map((card) => {
		column = column == maxColumns - 1 ? 0 : column + 1;
		row = column == 0 ? row + 1 : row;
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
	const contentStyle = {
		height: (row + 1) * cardHeight + tabsHeight,
	};

	return (
		<div
			className={`${styles.container} ${
				props.topLayer && styles.zIndexIncreased
			}`}
			style={contentStyle}
		>
			{cardElements}
		</div>
	);
}

export default React.memo(Cards, objectsEqual);
