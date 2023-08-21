import {IBasicResources} from "../../../../interfaces/Resources/Resources";
import {IBeast, IBeastRenderData} from "../../../../interfaces/Beasts/Beast";
import {IGame} from "../../../../interfaces/Game";
import {AssignablePawnsItem} from "../../AssignablePawnsItem/AssignablePawnsItem";
import {ACTION, ACTION_ITEM} from "../../../../interfaces/ACTION";

export class Beast extends AssignablePawnsItem implements IBeast {

    protected readonly _strength: number;
    protected readonly _weaponLoss: number;
    protected readonly _reward: IBasicResources;
    protected readonly _name: string;
    protected readonly _namePL: string;

    constructor(
        name: string,
        namePL: string,
        strength: number,
        weaponLoss: number,
        reward: IBasicResources,
        game: IGame
    ) {
        super(ACTION.HUNT, ACTION_ITEM.HUNT, game);
        this._name = name;
        this._namePL = namePL;
        this._strength = strength;
        this._weaponLoss = weaponLoss;
        this._reward = reward;
    }

    get renderData(): IBeastRenderData {
        return {
            name: this.name,
            namePL: this.namePL,
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

    get namePL(): string {
        return this._namePL;
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
        const pawn = this._game.actionSlotService.getPawn("hunt-leader-0");
        if (!pawn) {
            throw new Error("can't get leader");
        }
        return pawn.character;
    }

    applySpecialEffect() {
        return;
    }
}
