import { IGame } from "@shared/types/Game/Game";
import { IMoraleService } from "@shared/types/Game/Morale/Morale";
import { INVENTION_NORMAL } from "@shared/types/Game/InventionService/Invention";
import { LOG_CODE } from "@shared/types/Game/ChatLog/LOG_CODE";
import { TERMS } from "@shared/types/Terms/TERMS";
import { PHASE } from "@shared/types/Game/PhaseService/Phase";
import { ICharacter } from "@shared/types/Game/Characters/Character";
import { IPlayerCharacter } from "@shared/types/Game/Characters/PlayerCharacter";

export class MoraleService implements IMoraleService {
	private _lvl = 0;
	private _maxLvl = 3;
	private readonly _minLvl = -3;

	private readonly _game: IGame;
	private _diary: boolean = false;
	private _drums: boolean = false;

	constructor(game: IGame) {
		this._game = game;
	}

	get renderData() {
		return {
			lvl: this._lvl,
		};
	}

	get lvl(): number {
		return this._lvl;
	}

	get diary(): boolean {
		return this._diary;
	}

	set diary(value: boolean) {
		this._diary = value;
	}

	get drums(): boolean {
		return this._drums;
	}

	set drums(value: boolean) {
		this._drums = value;
	}

	lvlUp(amount: number, logSource: string) {
		if (this._lvl < 3) {
			this._lvl += amount;
			this._game.logService.addMessage(
				{
					code: LOG_CODE.MORALE_INCREASED_TO_LVL,
					amount: this._lvl,
					subject1: "",
					subject2: "",
				},
				"positive",
				logSource
			);
		}
	}

	lvlDown(amount: number, logSource: string) {
		this._game.logService.addMessage(
			{
				code: LOG_CODE.MORALE_DECREASED_TO_LVL,
				amount,
				subject1: "",
				subject2: "",
			},
			"negative",
			logSource
		);

		const newLvl = this._lvl - amount;
		if (newLvl > this._minLvl) {
			this._lvl = newLvl;
		} else {
			this._lvl = this._minLvl;
			const deficit = Math.abs(newLvl) + this._minLvl;
			this._game.characterService.hurtAllPlayerCharacters(
				deficit,
				TERMS.UNFULFILLED_DEMAND
			);
		}
	}

	public prePhaseEffect() {
		const playerService = this._game.playerService;
		if (playerService.players.length === 1) {
			this.lvlUp(1, "Cieszysz się, że żyjesz");
		}
	}

	public triggerPhaseEffect() {
		const primeCharacter =
			this._game.playerService.primePlayer.getCharacter();
		let amount = this.countDeterminationReward(this._lvl);
		if (amount === 0) {
			return;
		}
		if (this._lvl === 3) {
			this.makePlayerChooseReward(primeCharacter, amount);
			return;
		}
		amount > 0
			? this.incrDetermination(primeCharacter, amount)
			: this.decrDetermination(primeCharacter, amount);
	}



	private incrDetermination(character: IPlayerCharacter, amount: number) {
		this._game.characterService.incrDetermination(
			character,
			amount,
			PHASE.MORALE
		);
	}

	private decrDetermination(character: IPlayerCharacter, amount: number) {
		this._game.characterService.decrDeterminationOrGetHurt(
			character,
			Math.abs(amount),
			PHASE.MORALE
		);
	}

	private countDeterminationReward(baseAmount: number) {
		if (this._game.inventionService.isBuilt(INVENTION_NORMAL.DIARY)) {
			baseAmount++;
		}
		if (this._game.inventionService.isBuilt(INVENTION_NORMAL.DRUMS)) {
			baseAmount += 2;
		}
		return baseAmount;
	}

	private makePlayerChooseReward(
		character: IPlayerCharacter,
		determinationAmount: number
	) {
		this._game.startPickingObject(
			[
				{ name: "determination", amount: determinationAmount },
				{ name: "health", amount: 1 },
			],
			character,
			1,
			PHASE.MORALE,
			"resource",
			(picked) => {
				if (picked.name === "determination") {
					this._game.characterService.incrDetermination(
						character,
						determinationAmount,
						PHASE.MORALE
					);
				} else {
					this._game.characterService.heal(
						character,
						1,
						PHASE.MORALE
					);
				}
			}
		);
	}
}
