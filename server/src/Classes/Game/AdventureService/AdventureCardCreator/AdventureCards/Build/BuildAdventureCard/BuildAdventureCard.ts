import {AdventureCard} from "../../../AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ACTION} from "@shared/types/Game/ACTION";
import {AdventureOptionLabel, IAdventureCard,} from "@shared/types/Game/AdventureService/AdventureCard";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";

export abstract class BuildAdventureCard
    extends AdventureCard
    implements IAdventureCard {
    protected readonly _action = ACTION.BUILD;

    protected constructor(
        name: ADVENTURE_CARD_BUILD,
        namePL: string,
        decide: boolean,
        game: IGame,
        option1Label: AdventureOptionLabel,
        option2Label: AdventureOptionLabel
    ) {
        super(name, namePL, decide, game, option1Label, option2Label);
    }
}
