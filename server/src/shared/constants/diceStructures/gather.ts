import { ActionDiceSide } from "@shared/types/Game/RollDice/RollDice";

const hurt: ActionDiceSide[] = [
	"blank",
	"blank",
	"blank",
	"hurt",
	"blank",
	"blank",
];
const mystery: ActionDiceSide[] = [
	"mystery",
	"mystery",
	"blank",
	"mystery",
	"blank",
	"blank",
];
const success: ActionDiceSide[] = [
	"success",
	"success",
	"determination",
	"success",
	"success",
	"success",
];

export const gather = { hurt, mystery, success };
