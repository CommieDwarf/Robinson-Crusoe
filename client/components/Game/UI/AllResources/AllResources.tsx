import React from "react";
import styles from "./AllResources.module.css";
import frameStyles from "./Frame/Frame.module.css";
import { Frame } from "./Frame/Frame";
import { Resources } from "./Resources/Resources";
import productionImg from "/public/UI/phase/production.webp";
import boardImg from "/public/UI/misc/board.webp";
import ResizableImage from "../../../DynamicImage/DynamicImage";
import { objectsEqual } from "@shared/utils/objectsEqual";
import { useAppSelector } from "../../../../store/hooks";
import {
	selectResourceService,
	selectTokenService,
} from "../../../../reduxSlices/gameSession";


function AllResources() {
	const { future, owned } = useAppSelector(selectResourceService) || {};

	const tokenService = useAppSelector(selectTokenService);

	const tokens = {
		future: tokenService?.future.length,
		owned: tokenService?.owned.length,
	};

	if (!future || !owned) return null;
	return (
		<div className={`${styles.container} tour-resources`}>
			<Frame />
			<div className={`${styles.resources} ${styles.future}`}>
				<Resources
					type={"future"}
					resources={future}
					tokenAmount={tokens.future}
				/>
			</div>
			<div className={frameStyles.midBar}>
				<ResizableImage src={boardImg} alt={"ramka"} />
				<div className={frameStyles.barDecoration}>
					<div className={frameStyles.productionIcon}>
						<ResizableImage
							src={productionImg}
							alt={"ikona produkcji"}
						/>
					</div>
				</div>
			</div>
			<div className={`${styles.resources} ${styles.owned}`}>
				<Resources
					type={"owned"}
					resources={owned}
					tokenAmount={tokens.owned}
				/>
			</div>
		</div>
	);
}

export default React.memo(AllResources, objectsEqual);
