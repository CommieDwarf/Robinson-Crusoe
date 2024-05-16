import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class DefensivePlan extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.DEFENSIVE_PLAN,
            "all",
            null,
            3,
            game,
            character
        );
    }

    use() {
        const isShelterBuilt = this._game.constructionService.isBuilt(CONSTRUCTION.SHELTER);
        super.use(null);
        this._game.startPickingObject([],
            this._character as IPlayerCharacter,
            0,
            this._name,
            "custom",
            () => {
                this._game.constructionService.lvlUpConstruction(CONSTRUCTION.WEAPON, 1, this._name);
            },
            isShelterBuilt ? () => {
                this._game.constructionService.lvlUpConstruction(CONSTRUCTION.PALISADE, 1, this._name);
            } : undefined,
        )
    }

}
