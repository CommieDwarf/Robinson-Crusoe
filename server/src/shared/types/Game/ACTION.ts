export enum ACTION_ITEM {
	THREAT = "threat",
	HUNT = "hunt",
	INVENTION = "invention",
	CONSTRUCTION = "construction",
	TILE = "tile",
	ARRANGE_CAMP = "arrange camp",
	REST = "rest",
}

export enum ACTION {
	THREAT = "threat",
	HUNT = "hunt",
	BUILD = "build",
	GATHER = "gather",
	EXPLORE = "explore",
	ARRANGE_CAMP = "arrange camp",
	REST = "rest",
}

export type UniqueAction =
	| ACTION.THREAT
	| ACTION.HUNT
	| ACTION_ITEM.CONSTRUCTION
	| ACTION_ITEM.INVENTION
	| ACTION.GATHER
	| ACTION.EXPLORE
	| ACTION.REST
	| ACTION.ARRANGE_CAMP;

export type AdventureAction = ACTION.GATHER | ACTION.BUILD | ACTION.EXPLORE;
