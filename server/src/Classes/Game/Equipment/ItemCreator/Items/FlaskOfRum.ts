import { Item } from "../Item";
import { IItem, ITEM } from "@shared/types/Game/Equipment/Item";
import { IGame } from "@shared/types/Game/Game";
import { ICharacter } from "@shared/types/Game/Characters/Character";

export class FlaskOfRum extends Item implements IItem {
	constructor(game: IGame) {
		super(ITEM.FLASK_OF_RUM, game);
	}

	use(character: ICharacter, target?: ICharacter) {
		if (this._game.phaseService.phase !== "night") {
			return;
		} else {
			super.use(character);
			this._game.characterService.heal(character, 1, this.name);
		}
	}
}
