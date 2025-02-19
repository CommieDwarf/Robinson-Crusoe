import React from "react";
import styles from "./ArrangeCampRest.module.css";
import RestArrange from "./RestOrArrangeCamp/RestArrange";
import { ACTION } from "@shared/types/Game/ACTION";
import { objectsEqual } from "@shared/utils/objectsEqual";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";

interface Props {
	topLayer: boolean;
}

function ArrangeCampRest(props: Props) {
	const arrangeCampRestService = useAppSelector(
		(state) => selectGame(state)?.arrangeCampRestService!
	);

	if (!arrangeCampRestService) return null;

	return (
		<div
			className={`${styles.container} ${
				props.topLayer && styles.zIndexIncreased
			} tour-arrange-rest`}
		>
			<RestArrange
				pawnAmount={arrangeCampRestService.pawnAmount.rest}
				type={ACTION.REST}
			/>
			<RestArrange
				pawnAmount={arrangeCampRestService.pawnAmount.arrangeCamp}
				type={ACTION.ARRANGE_CAMP}
			/>
		</div>
	);
}

export default React.memo(ArrangeCampRest, objectsEqual);
