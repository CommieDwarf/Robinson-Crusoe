import {
	CONSTRUCTION,
	ConstructionCostType,
} from "@shared/types/Game/ConstructionService/Construction";
import {
	IConstructionService,
	IConstructionServiceRenderData,
} from "@shared/types/Game/ConstructionService/IConstructionService";
import { IGame } from "@shared/types/Game/Game";
import { Construction } from "./Construction";
import { SingleResourceRequirement } from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";
import { LOG_CODE } from "@shared/types/Game/ChatLog/LOG_CODE";

const constructionPL = {
	shelter: "schronienie",
	roof: "dach",
	palisade: "palisada",
	weapon: "broń",
};

export class ConstructionService implements IConstructionService {
	private readonly _constructions: Construction[];
	private readonly _game: IGame;

	constructor(game: IGame) {
		this._game = game;
		this._constructions = this.initConstructions();
	}

	get renderData(): IConstructionServiceRenderData {
		return {
			constructions: this._constructions.map(
				(construct) => construct.renderData
			),
		};
	}

	get constructions(): Construction[] {
		return this._constructions;
	}

	private initConstructions() {
		return Object.entries(CONSTRUCTION).map(([key, value]) => {

            const { woodCost, leatherCost } = this.getResourceCost(value as CONSTRUCTION);

			return new Construction(
				value,
				constructionPL[value],
				value !== "shelter" && value !== "weapon",
				this._game,
				woodCost,
				value === CONSTRUCTION.WEAPON ? null : leatherCost,
			);
		});
	}

	lvlUpConstruction(
		construction: CONSTRUCTION,
		by: number,
		logSource: string
	) {
		const construct = this.getConstruction(construction);
		if (
			(construction === CONSTRUCTION.ROOF ||
				construction === CONSTRUCTION.PALISADE) &&
			!this.isBuilt(CONSTRUCTION.SHELTER)
		) {
			return;
		}
		construct.incrementLvl(by);

		this._game.logService.addMessage(
			{
				code: LOG_CODE.CONSTRUCTION_UPGRADED,
				amount: construct.lvl,
				subject1: construction,
				subject2: "",
			},
			"positive",
			logSource
		);
	}

	lvlDownConstruction(
		construction: CONSTRUCTION,
		by: number,
		logSource: string
	) {
		const construct = this.getConstruction(construction);
		construct.decrementLvl(by);

		this._game.logService.addMessage(
			{
				code: LOG_CODE.CONSTRUCTION_DOWNGRADED,
				amount: construct.lvl,
				subject1: construction,
				subject2: "",
			},
			"negative",
			logSource
		);
	}

	lvlDownIfPossible(
		construction: CONSTRUCTION,
		by: number,
		logSource: string
	) {
		const construct = this.getConstruction(construction);
		const diff = construct.lvl - by;
		if (diff > 0) {
			this.lvlDownConstruction(construction, by, logSource);
		} else {
			this.lvlDownConstruction(construction, construct.lvl, logSource);
		}
	}

	lvlDownOrGetHurt(
		construction: CONSTRUCTION,
		by: number,
		logSource: string
	) {
		const construct = this.getConstruction(construction);
		const diff = construct.lvl - by;

		if (diff >= 0) {
			this.lvlDownConstruction(construction, by, logSource);
		} else {
			if (construct.lvl !== 0) {
				this.lvlDownConstruction(
					construction,
					construct.lvl,
					logSource
				);
			}
			this._game.characterService.hurtAllPlayerCharacters(
				by - construct.lvl,
				logSource
			);
		}
	}

	setLvl(construction: CONSTRUCTION, lvl: number) {
		this.getConstruction(construction).lvl = lvl;
		this.updateLocks();
	}

	public setDividedLvlByTwoRoundedDown(
		construction: CONSTRUCTION,
		logSource: string
	) {
		this.setDividedLvlByTwo(construction, logSource, Math.floor);
	}

	public setDividedLvlByTwoRoundedUp(
		construction: CONSTRUCTION,
		logSource: string
	) {
		this.setDividedLvlByTwo(construction, logSource, Math.ceil);
	}

	setDividedLvlByTwo(
		construction: CONSTRUCTION,
		logSource: string,
		roundFunction: (value: number) => number
	) {
		const construct = this.getConstruction(construction);
		const prevValue = construct.lvl;
		const updatedLvl = roundFunction(prevValue / 2);
		const diff = prevValue - updatedLvl;

		if (diff !== 0) {
			this.lvlDownConstruction(construction, diff, logSource);
		}
	}

	unlockConstruction(construction: CONSTRUCTION) {
		this.getConstruction(construction).locked = false;
	}

	lockConstruction(construction: CONSTRUCTION) {
		this.getConstruction(construction).locked = true;
	}

	unlockAllConstructions() {
		this._constructions.forEach(
			(construction) => (construction.locked = false)
		);
	}

	updateLocks() {
		if (
			this.getConstruction(CONSTRUCTION.SHELTER).lvl > 0 ||
			this._game.tileService.campTile.tileResourceService?.extras
				.naturalShelter
		) {
			this.unlockAllConstructions();
		} else {
			[CONSTRUCTION.PALISADE, CONSTRUCTION.ROOF].forEach(
				(construction) => {
					this.lockConstruction(construction);
				}
			);
		}
	}

	isBuilt(construction: CONSTRUCTION) {
		return this.getConstruction(construction).lvl > 0;
	}

	getConstruction(construction: CONSTRUCTION) {
		const construct = this._constructions.find(
			(constr) => constr.name === construction
		);
		if (!construct) {
			throw new Error(
				"Cant find structure with given construction: " + construction
			);
		}
		return construct;
	}

	public switchCommittedResources(construction: CONSTRUCTION) {
		this.getConstruction(construction).switchCommittedResourceType();
	}

	private getResourceCost(construction: CONSTRUCTION): {
        woodCost: SingleResourceRequirement<ConstructionCostType>,
        leatherCost: SingleResourceRequirement<ConstructionCostType>
    } {
        let woodCost;
        let leatherCost;

		if (construction === CONSTRUCTION.WEAPON) {
            woodCost = 1;
            leatherCost = Infinity;
		} else {
            const playerAmount = this._game.playerService.players.length;
            woodCost = Math.max(playerAmount, 2);
            leatherCost = woodCost - 1;
        }

		return {
			woodCost: {
				type: "wood",
				amount: woodCost,
			},
			leatherCost: {
				type: "leather",
				amount: leatherCost,
			},
		};
	}
}
