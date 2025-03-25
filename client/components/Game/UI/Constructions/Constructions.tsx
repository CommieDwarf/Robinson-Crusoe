import React from "react";
import Construction from "./Construction/Construction";
import styles from "./Constructions.module.css";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";

interface Props {
	topLayer: boolean;
}

export default function Constructions(props: Props) {
	const constructions = useAppSelector(
		(state) => selectGame(state)!.constructionService.constructions
	);
	return (
		<div
			className={`${styles.container} ${
				props.topLayer && styles.zIndexIncreased
			} tour-constructions`}
		>

			
			{constructions.map((construction, i) => {
				return <Construction construction={construction} key={i} />;
			})}
		</div>
	);
}
