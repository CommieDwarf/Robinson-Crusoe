import { IArrangeCampRestService } from "@shared/types/Game/RestArrangeCampService/ArrangeCampRestService";
import { IGame } from "@shared/types/Game/Game";
import { TREASURE_MYSTERY_CARD } from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import { INVENTION_NORMAL } from "@shared/types/Game/InventionService/Invention";
import { ITEM } from "@shared/types/Game/Equipment/Item";
import { IPlayer } from "@shared/types/Game/PlayerService/Player";
import { ICharacter } from "@shared/types/Game/Characters/Character";
import { IPlayerCharacter } from "@shared/types/Game/Characters/PlayerCharacter";
import { ACTION } from "@shared/types/Game/ACTION";

export class ArrangeCampRestService implements IArrangeCampRestService {
	private readonly _game: IGame;

	private _arrangeCampBonus: "determination" | "morale" | null = null;
	private _pawnAmount = {
		rest: 0,
		arrangeCamp: 0,
	};

	constructor(game: IGame) {
		this._game = game;
	}

	get renderData() {
		return {
			arrangeCampBonus: this._arrangeCampBonus,
			pawnAmount: this._pawnAmount,
		};
	}

	get arrangeCampBonus(): "determination" | "morale" | null {
		return this._arrangeCampBonus;
	}

	get pawnAmount(): { rest: number; arrangeCamp: number } {
		return this._pawnAmount;
	}

	public incrPawnAmount(action: "rest" | "arrangeCamp") {
		this._pawnAmount[action]++;
	}

	public decrPawnAmount(action: "rest" | "arrangeCamp") {
		this._pawnAmount[action]--;
	}

	public rest(character: ICharacter) {
		const bedBuilt = this._game.inventionService.isBuilt(
			INVENTION_NORMAL.BED
		);
		const hammockOwned = this._game.mysteryService.hasTreasureCard(
			TREASURE_MYSTERY_CARD.HAMMOCK
		);
		let healAmount = bedBuilt ? 2 : 1;
		this._game.characterService.heal(character, healAmount, "Odpoczynek");
		if (bedBuilt || hammockOwned) {
			this._game.characterService.incrDetermination(
				character,
				1,
				"Odpoczynek"
			);
		}
	}

	public arrangeCamp(character: ICharacter, useBible: boolean) {
		const characterService = this._game.characterService;
		let determination = 2;
		let logSource = "Porządkowanie obozu";
		if (useBible) {
			logSource += " + Biblia";
			determination = 3;
			characterService.heal(character, 1, logSource);
			this._game.equipmentService.useItem(ITEM.BIBLE, character);
		}
		if (this._game.playerService.players.length === 4) {
			this._game.startPickingObject(
				[
					{ name: "determination", amount: determination },
					{ name: "morale", amount: 1 },
				],
				character as IPlayerCharacter,
				1,
				ACTION.ARRANGE_CAMP,
				"resource",
				(picked) => {
					if (picked.name === "determination") {
						this._game.characterService.incrDetermination(
							character,
							determination,
							ACTION.ARRANGE_CAMP
						);
					} else {
						this._game.moraleService.lvlUp(1, ACTION.ARRANGE_CAMP);
					}
				}
			);
			return;
		}
		this._game.moraleService.lvlUp(1, character.name);
		characterService.incrDetermination(character, determination, logSource);
	}
}
