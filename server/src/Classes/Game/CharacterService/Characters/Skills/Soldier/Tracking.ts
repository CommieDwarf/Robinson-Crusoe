import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ForbiddenPlayerAction} from "../../../../../../Errors/ForbiddenPlayerAction";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";

export class Tracking extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.TRACKING,
            "all",
            null,
            2,
            game,
            character
        );
    }

    use() {
        if (this._game.beastService.deckCount === 0) {
            throw new ForbiddenPlayerAction(ALERT_CODE.BEAST_DECK_IS_EMPTY);
        }
        const beast = this._game.beastService.peekBeastFromDeck();

        super.use(null);
        this._game.startPickingObject([beast],
            this._character as IPlayerCharacter,
            0,
            this._name,
            "beast",
            () => {
                this._game.beastService.swapDeckTopToBottom();
            },
            () => {
            }
        )
    }

}
