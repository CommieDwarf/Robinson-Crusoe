import ResizableImage from "../../components/ResizableImage/ResizableImage";
import {
	PAWN_HELPER_ACTION,
} from "@shared/types/Game/Pawns/Pawn";
import { StaticPawnHelper } from "../../components/Game/UI/StaticPawnHelper";
import styles from "./icon.module.css";

export type Icon =
	| "determination"
	| "heart"
	| "reroll"
	| "rain-cloud"
	| "snow-cloud"
	| "food"
	| "discovery"
	| "wood"
	| "weapon"
	| "palisade"
	| "star"
	| "morale-arrow"
	| "compass"
	| "roof";

const icons: Icon[] = [
	"determination",
	"heart",
	"reroll",
	"rain-cloud",
	"snow-cloud",
	"food",
	"discovery",
	"wood",
	"weapon",
	"palisade",
	"star",
	"morale-arrow",
	"compass",
	"roof",
];

export function insertIconsIntoText(string: string, iconClassName?: string) {
	const array = string.split("$");


	return array.map((str, i) => {
	const aspectRatio = str === "morale-arrow" ? 2.5 : 1;
		if (icons.includes(str.toLowerCase() as Icon)) {
			return (
				<div key={i} className={iconClassName ? iconClassName : styles.icon} style={{aspectRatio}}>
					<ResizableImage
						src={`/UI/icons/${str.toLowerCase()}.png`}
						alt={str}
					/>
				</div>
			);
		} else if (
			Object.values(PAWN_HELPER_ACTION).includes(
				str as PAWN_HELPER_ACTION
			)
		) {
			return (
				<div key={i} className={iconClassName}>
					<StaticPawnHelper action={str as PAWN_HELPER_ACTION} />
				</div>
			);
		} else {
			return <span key={i}>{str}</span>;
		}
	});
}
