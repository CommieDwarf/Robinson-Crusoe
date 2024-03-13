import {IBasicResources} from "@shared/types/Game/Resources/Resources";
import {IBeast, IBeastRenderData} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {AssignablePawnsItem} from "../../AssignablePawnsItem/AssignablePawnsItem";
import {ACTION, ACTION_ITEM} from "@shared/types/Game/ACTION";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {getActionSlotDroppableId} from "@shared/utils/getActionSlotDroppableId";

export class Beast extends AssignablePawnsItem implements IBeast {

    protected readonly _strength: number;
    protected readonly _weaponLoss: number;
    protected readonly _reward: IBasicResources;
    protected readonly _name: string;

    constructor(
        name: string,
        strength: number,
        weaponLoss: number,
        reward: IBasicResources,
        game: IGame
    ) {
        super(ACTION.HUNT, ACTION_ITEM.HUNT, game);
        this._name = name;
        this._strength = strength;
        this._weaponLoss = weaponLoss;
        this._reward = reward;
    }

    get renderData(): IBeastRenderData {
        return {
            name: this.name,
            ...super.getAssignablePawnsRenderData(),
        };
    }

    // ----------------------------------------------

    get requiredPawnAmount() {
        return 2;
    }

    get name(): string {
        return this._name;
    }


    get strength(): number {
        return this._strength;
    }

    get weaponLoss(): number {
        return this._weaponLoss;
    }

    get reward(): IBasicResources {
        return this._reward;
    }

    protected getLeader() {
        const pawn = this._game.actionSlotService.getPawn(getActionSlotDroppableId(ACTION.HUNT, null, null, 0));
        if (!pawn) {
            throw new Error("can't get leader");
        }
        return pawn.owner as ICharacter;
    }

    applySpecialEffect() {
        return;
    }
}
