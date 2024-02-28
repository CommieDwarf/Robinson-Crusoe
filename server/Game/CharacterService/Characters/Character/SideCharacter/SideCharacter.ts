import {Character} from "../Character";
import {
    ISideCharacter,
    ISideCharacterRenderData,
    SideCharacterName,
} from "../../../../../../interfaces/Characters/SideCharacter";
import {SideCharEffects} from "../../../CharEffects/CharEffects";
import {PawnService} from "../../../../PawnService/PawnService";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class SideCharacter extends Character implements ISideCharacter {
    get name(): SideCharacterName {
        return this._name;
    }

    protected declare _name: SideCharacterName;

    constructor(
        name: SideCharacterName,
        namePL: string,
        id: number,
        maxHealth: number,
        game: IGame
    ) {
        super(name, namePL, id, maxHealth, game);
        this._pawnService = new PawnService<ICharacter>(this._game, this);
        this.pawnService.initPawns(1, false, null);
        this._effects = new SideCharEffects(this);
    }

    get renderData(): ISideCharacterRenderData {
        return {
            ...super.getRenderData(),
            name: this._name, // overriding CharacterName type into SideCharacterName type.
        };
    }
}
