// @flow
import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./CardList.module.css";
import { Tabs } from "./Tabs/Tabs";
import Cards from "./Cards/Cards";
import { useAppSelector } from "store/hooks";
import { selectGame } from "reduxSlices/gameSession";
import { dimensions } from "./dimensions";

type Props = {
	topLayerElement: string;
	isBeingDragged: boolean;
};

export type Tab = "inventions" | "mysteryCards" | "items";

const scrollLeft = {
	inventions: "0",
	mysteryCards: "-100%",
	items: "-200%",
};

export const CardList = (props: Props) => {
	const [scrollTop, setScrollTop] = useState(0);
	const [selectedTab, setSelectedTab] = useState<Tab>("inventions");
	const [containerWidth, setContainerWidth] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (containerRef.current)
			setContainerWidth(containerRef.current.offsetWidth);
	}, []);

	function switchTab(tab: Tab) {
		if (selectedTab !== tab) {
			if (tab === "items" || tab === "mysteryCards") {
				containerRef.current?.scrollTo({ top: 0 });
			}
			setSelectedTab(tab);
		}
	}
	const contentRef = useRef(null);

	function handleScroll(event: React.UIEvent<HTMLDivElement>) {
		setScrollTop(event.currentTarget.scrollTop);
		if (props.isBeingDragged && containerRef.current) {
			containerRef.current.scrollLeft = 0;
		}
	}

	const topLayer =
		props.topLayerElement.includes("invention") ||
		props.topLayerElement.includes("mystery");

	const [cardHeight, setCardHeight] = useState(0);

	useEffect(() => {
		setCardHeight((containerWidth - dimensions.scrollbar) /
		dimensions.cardsPerRow /
		dimensions.cardAspectRatio)
	}, [containerWidth])

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}
		const resizeObserver = new ResizeObserver(() => {
			setContainerWidth(containerRef.current?.offsetWidth ?? 0);
		})
		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
		}
	})


	const [inventionAmount, mysteryAmount, itemAmount] = useAppSelector(
		(state) => {
			const game = selectGame(state);
			return [
				game.inventionService.inventions.length,
				game.mysteryService.cardsAsReminders.length,
				game.equipmentService.items.length,
			];
		}
	);

	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		let cardAmount = 0;
		switch (selectedTab) {
			case "items":
				cardAmount = itemAmount;
				break;
			case "mysteryCards":
				cardAmount = mysteryAmount;
				break;
			case "inventions":
				cardAmount = inventionAmount;
				break;
		}
		const totalRows = Math.ceil(cardAmount / 4);
		const totalCardsHeight = Math.max(totalRows) * cardHeight + dimensions.tabsHeight
		const containerHeight = containerRef.current?.clientHeight || 0;
		setContentHeight(Math.max(totalCardsHeight, containerHeight));

	}, [selectedTab, itemAmount, mysteryAmount, inventionAmount, containerRef.current, containerWidth, cardHeight])


	

	return (
		<>
			<Tabs switchTab={switchTab} currentTab={selectedTab} />
			<div
				className={`${styles.container}
                 ${topLayer && styles.zIndexIncreased}
				 ${props.isBeingDragged && styles.disabledScroll}
                 tour-cards`}
				ref={containerRef}
				onScroll={handleScroll}
			>
				<div
					className={`${styles.content} ${props.isBeingDragged && styles.disabledScroll}`}
					style={{
						left: scrollLeft[selectedTab],
						height: contentHeight + "px",
					}}
					ref={contentRef}
					
					
				>
					<div className={`${styles.cards} ${styles.inventions}`}>
						<Cards
							tab={"inventions"}
							isBeingDragged={props.isBeingDragged}
							topLayerElement={props.topLayerElement}
							topLayer={topLayer}
							scrollTop={scrollTop}
							containerWidth={containerWidth}
						/>
					</div>
					<div className={`${styles.cards} ${styles.mysteryCards}`}>
						<Cards
							tab={"mysteryCards"}
							isBeingDragged={props.isBeingDragged}
							topLayerElement={props.topLayerElement}
							topLayer={topLayer}
							scrollTop={scrollTop}
							containerWidth={containerWidth}
						/>
					</div>
					<div className={`${styles.cards} ${styles.items}`}>
						<Cards
							tab={"items"}
							isBeingDragged={props.isBeingDragged}
							topLayerElement={props.topLayerElement}
							topLayer={topLayer}
							scrollTop={scrollTop}
							containerWidth={containerWidth}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
