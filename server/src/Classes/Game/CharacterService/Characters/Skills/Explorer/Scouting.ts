import {Ability} from "../Skill/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";

export class Scouting extends Ability {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.SCOUTING, "description", "quote", "all", null, 2, game, character);
    }


    use(target: ActionDice) {
        super.use(target);
        const tokenService = this._game.tokenService;
        const [token1, token2] = [
            tokenService.getRandomTokenFromStack(),
            tokenService.getRandomTokenFromStack(),
        ]

        this._game.startPickingObject([token1, token2], this._character as IPlayerCharacter, 1, this._name, "token", (token) => {
            const discarded = token === token1 ? token2 : token1;
            tokenService.addTokenToOwned(token);
            tokenService.shuffleInToStack(discarded.name);
        })
    }
}
