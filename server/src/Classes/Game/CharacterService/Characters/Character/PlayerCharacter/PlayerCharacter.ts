import {Character} from "../Character";
import {
    IPlayerCharacter,
    IPlayerCharacterRenderData,
    PlayerCharacterName,
    Wounds,
} from "@shared/types/Game/Characters/PlayerCharacter";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {PawnService} from "../../../../PawnService/PawnService";
import {ICharEffects} from "@shared/types/Game/Characters/CharEffects";
import {PlayerCharEffects} from "../../../CharEffects/CharEffects";
import {IPawnService} from "@shared/types/Game/Pawns/PawnService";
import {IGame} from "@shared/types/Game/Game";
import {Gender} from "@shared/types/Game/Characters/Character";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {removeFromArray} from "@shared/utils/removeFromArray";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";


export abstract class PlayerCharacter
    extends Character
    implements IPlayerCharacter {


    protected readonly _player: IPlayer;
    protected readonly _moraleThresholds: number[];
    private _moraleThresholdsRemoved: number[] = [];
    protected _pawnService: IPawnService<IPlayerCharacter>
    protected declare _name: PlayerCharacterName;
    protected declare _skills: IAbility<any>[];
    private _weaponBoost = 0;

    private _hasPersonalResource = {
        wood: false,
        leather: false,
        food: false,
        dryFood: false
    }

    protected _wounds: Wounds = {
        head: [],
        arm: [],
        stomach: [],
        leg: [],
    }

    protected constructor(
        name: PlayerCharacterName,
        id: number,
        maxHealth: number,
        game: IGame,
        gender: Gender,
        moraleThresholds: number[],
        player: IPlayer
    ) {
        super(name, id, maxHealth, game);
        this._player = player;
        this._moraleThresholds = moraleThresholds;
        this._gender = gender;
        this._effects = new PlayerCharEffects(this);
        this._pawnService = new PawnService(this._game, this);

        this.pawnService.initPawns(2, false, null);
    }


    get renderData(): IPlayerCharacterRenderData {
        return {
            ...this.getPawnOwnerRenderData(),
            pawnService: this._pawnService.renderData,
        }
    }


    public getPawnOwnerRenderData(): Omit<IPlayerCharacterRenderData, "pawnService"> {
        return {
            ...super.getPawnOwnerRenderData(),
            moraleThresholds: this._moraleThresholds,
            playerId: 0,
            name: this.name,
            abilities: this._skills.map((skill) => skill.renderData),
            moraleThresholdsRemoved: this._moraleThresholdsRemoved,
            wounds: this._wounds,
            weaponBoost: this._weaponBoost,
            hasPersonalResource: this._hasPersonalResource
        }
    }

    // ---------------------------------------------


    get hasPersonalResource() {
        return this._hasPersonalResource;
    }

    get wounds(): Wounds {
        return this._wounds;
    }

    get moraleThresholdsRemoved(): number[] {
        return this._moraleThresholdsRemoved;
    }

    get abilities(): IAbility<any>[] {
        return this._skills;
    }

    get effects(): ICharEffects {
        return this._effects;
    }

    set effects(value: ICharEffects) {
        this._effects = value;
    }

    get name(): PlayerCharacterName {
        return this._name;
    }

    set name(value: PlayerCharacterName) {
        this._name = value;
    }

    get pawnService(): IPawnService<IPlayerCharacter> {
        return this._pawnService;
    }

    get player(): IPlayer {
        return this._player;
    }

    get moraleThresholds(): number[] {
        return this._moraleThresholds;
    }

    get gender(): "male" | "female" {
        return this._gender;
    }

    get shouldMoraleDrop(): boolean {
        return this._moraleThresholds.includes(this.health);
    }

    get weaponBoost(): number {
        return this._weaponBoost;
    }

    set weaponBoost(value: number) {
        this._weaponBoost = value;
    }


    // ---------------------------------------------

    setPersonalResource(resource: keyof IBasicResourcesAmount, value: boolean) {
        this._hasPersonalResource[resource] = value;
    }

    setWound(part: keyof Wounds, action: AdventureAction, source: string) {
        this._wounds[part].push(action);

        this._game.logService.addMessage({
            code: LOG_CODE.CHARACTER_GOT_WOUND,
            amount: 1,
            subject1: this._name,
            subject2: part
        }, "negative", source)

    }

    unsetWound(part: keyof Wounds, action: AdventureAction, source: string) {
        if (!this._wounds[part]) {
            return;
        }
        this._wounds[part] = removeFromArray(this._wounds[part], action);
    }

}
