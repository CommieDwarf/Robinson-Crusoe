// @flow
import * as React from "react";
import styles from "./MysteryCard.module.css";
import UseButtons from "./UseButtons/UseButtons";
import ResizableImage from "../../../../../../DynamicImage/DynamicImage";
import { IMysteryCardRenderData } from "@shared/types/Game/MysteryService/MysteryCard";
import { kebabCase } from "lodash";
import { MYSTERY_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { isTreasureCardRenderData } from "@shared/utils/typeGuards/isTreasureCard";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { socketEmitAction } from "../../../../../../../middleware/socketMiddleware";

type Props = {
	mysteryCard: IMysteryCardRenderData;
	hideActionSlots?: boolean;
	handleMouseOverButtons: (value: boolean) => void;
};
export const MysteryCard = (props: Props) => {
	const dispatch = useAppDispatch();

	function onMouseEnterButton() {
		props.handleMouseOverButtons(true);
	}

	function onMouseLeaveButton() {
		props.handleMouseOverButtons(false);
	}

	function use() {
		dispatch(
			socketEmitAction(
				MYSTERY_CONTROLLER_ACTION.USE_TREASURE_CARD,
				props.mysteryCard.name
			)
		);
		props.handleMouseOverButtons(false);
	}

	const imgUrl = `/UI/cards/mystery/${props.mysteryCard.type}/${kebabCase(
		props.mysteryCard.name
	)}.webp`;

	return (
		<div className={`${styles.container}`}>
			<ResizableImage
				src={imgUrl}
				alt={"karta pomysłu"}
				placeholder="blur"
				blurDataURL={imgUrl}
			/>
			{isTreasureCardRenderData(props.mysteryCard) && (
				<UseButtons
					card={props.mysteryCard}
					onMouseEnterButton={onMouseEnterButton}
					onMouseLeaveButton={onMouseLeaveButton}
					use={use}
				></UseButtons>
			)}
		</div>
	);
};
