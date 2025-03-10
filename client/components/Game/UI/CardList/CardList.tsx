// @flow
import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./CardList.module.css";
import { Tabs } from "./Tabs/Tabs";
import Cards from "./Cards/Cards";
import { useAppSelector } from "store/hooks";
import { selectGame } from "reduxSlices/gameSession";
import { cardDimensions } from "./cardDimensions";

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

	function handleScroll(event: React.UIEvent<HTMLDivElement>) {
		setScrollTop(event.currentTarget.scrollTop);
	}

	const topLayer =
		props.topLayerElement.includes("invention") ||
		props.topLayerElement.includes("mystery");

	const cardHeight = (containerWidth - cardDimensions.scrollbar) / 4 / cardDimensions.cardAspectRatio;

	const length = useAppSelector(
		(state) => selectGame(state).inventionService.inventions.length
	);
	const column = Math.ceil(length / 4);
	const contentHeight = column * cardHeight;


	return (
		<>
			<Tabs switchTab={switchTab} currentTab={selectedTab} />
			<div
				className={`${styles.container}
                 ${topLayer && styles.zIndexIncreased}
                 ${props.isBeingDragged && styles.disabledScroll} tour-cards`}
				ref={containerRef}
				onScroll={handleScroll}
			>
				<div
					className={styles.content}
					style={{
						left: scrollLeft[selectedTab],
						height: contentHeight + "px",
					}}
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
