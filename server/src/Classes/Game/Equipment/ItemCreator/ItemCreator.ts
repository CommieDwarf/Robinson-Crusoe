import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {ICreator} from "@shared/types/Game/Creator/Creator";
import {IGame} from "@shared/types/Game/Game";
import {Bible} from "./Items/Bible";
import {Biscuits} from "./Items/Biscuits";
import {EmptyBottle} from "./Items/EmptyBottle";
import {FlaskOfRum} from "./Items/FlaskOfRum";
import {Hammer} from "./Items/Hammer";
import {Pistol} from "./Items/Pistol";
import {StormGlass} from "./Items/StormGlass";
import {Tobacco} from "./Items/Tobacco";

export class ItemCreator implements ICreator<IItem, ITEM> {
    protected readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    create(item: ITEM) {
        switch (item) {
            case ITEM.BIBLE:
                return new Bible(this._game);
            case ITEM.BISCUITS:
                return new Biscuits(this._game);
            case ITEM.EMPTY_BOTTLE:
                return new EmptyBottle(this._game);
            case ITEM.FLASK_OF_RUM:
                return new FlaskOfRum(this._game);
            case ITEM.HAMMER:
                return new Hammer(this._game);
            case ITEM.PISTOL:
                return new Pistol(this._game);
            case ITEM.STORM_GLASS:
                return new StormGlass(this._game);
            case ITEM.TOBACCO:
                return new Tobacco(this._game);
        }
    }
}
