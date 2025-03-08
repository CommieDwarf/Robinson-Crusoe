import ResizableImage from "../../components/DynamicImage/DynamicImage";
import { PAWN_HELPER_ACTION } from "@shared/types/Game/Pawns/Pawn";
import { StaticPawnHelper } from "../../components/Game/UI/StaticPawnHelper";
import styles from "./icon.module.css";

export type Icon =
	| "determination"
	| "heart"
	| "health"
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
	| "morale"
	| "compass"
	| "roof"
	| "shelter";

const icons: Icon[] = [
	"determination",
	"heart",
	"health",
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
	"morale",
	"compass",
	"roof",
	"shelter",
];

// Podmienia w tekscie ikony zapisane w formacie: $ikona$ na obrazy i zwraca tablicę.
export function insertIconsIntoText(
	string: string,
	iconClassName?: string
): (string | JSX.Element)[] {
	return splitByWordAndIcon(string)
		.map((str, i) => {
			// Jeśli nie zaczyna się na "@" jest to zwykłe słowo/znak
			if (!str.startsWith("@")) {
				return str;
			}
			// Na tym etapie str zawiera nazwę ikony, pozbywamy się znaku "@".
			str = str.replace("@", "");
			// Zwracamy odpowiedni obraz na podstawie zsanityzywanej nazwy ikony.
			return getProperImg(str, i, iconClassName);
		})
		.map((str) => (str == "&" ? " " : str));
}

function splitByWordAndIcon(string: string) {
	// Podmieniamy & na &@ aby po splicie zachować informację o ikonie.
	// Podmieniamy " " na " &" aby zachować spacje.
	string = string.replaceAll("$", "$@").replaceAll(" ", " &");

	// Splitujemy na tablice przez $ oraz &.
	// @ na początku wyrazu oznacza ikonę. @ na koncu wyrazu oznacza słowo lub pusty string.
	const array = string.split(/\$|&/);
	// Pozbywamy się pustych stringów oraz zbędnych @
	return array.filter((word) => word !== "" && !word.endsWith("@"));
}

function getProperImg(
	str: string,
	key: number | string,
	iconClassName?: string
) {
	if (icons.includes(str.toLowerCase() as Icon)) {
		str = mapResourceToIcon(str.toLocaleLowerCase());
		return (
			<div
				key={key}
				className={`${iconClassName ? iconClassName : styles.icon} ${str.includes("morale") && styles.morale}`}
				style={{ aspectRatio: str.includes("morale") ? 2.5 : 1 }}
			>
				<ResizableImage
					src={`/UI/icons/${str.toLowerCase()}.webp`}
					alt={str}
				/>
			</div>
		);
	}
	if (Object.values(PAWN_HELPER_ACTION).includes(str as PAWN_HELPER_ACTION)) {
		return (
			<div key={key} className={iconClassName}>
				<StaticPawnHelper action={str as PAWN_HELPER_ACTION} />
			</div>
		);
	}
	return <span key={key}>{str}</span>;
}

const iconMappings: { [key: string]: string } = {
	morale: "morale-arrow",
	health: "heart",
};

function mapResourceToIcon(str: string) {
	return iconMappings[str] || str;
}
