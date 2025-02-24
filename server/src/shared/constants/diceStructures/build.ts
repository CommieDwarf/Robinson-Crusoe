import { ActionDiceSide } from "@shared/types/Game/RollDice/RollDice";

const hurt: ActionDiceSide[] = [
	"hurt",
	"blank",
	"blank",
	"blank",
	"blank",
	"hurt",
];
const mystery: ActionDiceSide[] = [
	"blank",
	"mystery",
	"blank",
	"mystery",
	"blank",
	"mystery",
];


const success: ActionDiceSide[] = [
	"success",
	"success",
	"determination",
	"determination",
	"success",
	"success",
];

export const build = { hurt, mystery, success };
