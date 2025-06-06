import { Item } from "../Item";
import { IItem, ITEM } from "@shared/types/Game/Equipment/Item";
import { IGame } from "@shared/types/Game/Game";
import { CONSTRUCTION } from "@shared/types/Game/ConstructionService/Construction";
import { ICharacter } from "@shared/types/Game/Characters/Character";

export class EmptyBottle extends Item implements IItem {
	constructor(game: IGame) {
		super(ITEM.EMPTY_BOTTLE, game);
	}

	use(character: ICharacter, target?: ICharacter) {
		super.use(character);
		this._game.constructionService.lvlUpConstruction(
			CONSTRUCTION.WEAPON,
			1,
			this.name
		);
	}
}
