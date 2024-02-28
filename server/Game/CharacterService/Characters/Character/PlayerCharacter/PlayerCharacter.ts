import {Character} from "../Character";
import {
    IPlayerCharacter,
    IPlayerCharacterRenderData,
    PlayerCharacterName,
    Wounds,
} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../../interfaces/PlayerService/Player";
import {PawnService} from "../../../../PawnService/PawnService";
import {ICharEffects} from "../../../../../../interfaces/Characters/CharEffects";
import {PlayerCharEffects} from "../../../CharEffects/CharEffects";
import {IPawnService} from "../../../../../../interfaces/Pawns/PawnService";
import {IGame} from "../../../../../../interfaces/Game";
import {Gender, ICharacter} from "../../../../../../interfaces/Characters/Character";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import i18n from "../../../../../../I18n/I18n";
import {ACTION, AdventureAction} from "../../../../../../interfaces/ACTION";
import {removeFromArray} from "../../../../../../utils/removeFromArray";

export abstract class PlayerCharacter
    extends Character
    implements IPlayerCharacter {


    protected readonly _player: IPlayer;
    protected readonly _moraleThresholds: number[];
    private _moraleThresholdsRemoved: number[] = [];
    protected _pawnService: IPawnService<IPlayerCharacter>
    protected declare _name: PlayerCharacterName;
    protected declare _skills: ISkill[];

    protected _wounds: Wounds = {
        head: [],
        arm: [],
        stomach: [],
        leg: [],
    }

    protected constructor(
        name: PlayerCharacterName,
        namePL: string,
        id: number,
        maxHealth: number,
        game: IGame,
        gender: Gender,
        moraleThresholds: number[],
        player: IPlayer
    ) {
        super(name, namePL, id, maxHealth, game);
        this._player = player;
        this._moraleThresholds = moraleThresholds;
        this._gender = gender;
        this._effects = new PlayerCharEffects(this);
        this._pawnService = new PawnService(this._game, this);
        console.log(this._pawnService);

        this.pawnService.initPawns(2, false, null);
    }

    get renderData(): IPlayerCharacterRenderData {
        return {
            ...super.getRenderData(),
            moraleThresholds: this._moraleThresholds,
            playerId: 0,
            name: this.name,
            skills: this._skills.map((skill) => skill.renderData),
            moraleThresholdsRemoved: this._moraleThresholdsRemoved,
            wounds: this._wounds,
        };
    }

    // ---------------------------------------------

    get wounds(): Wounds {
        return this._wounds;
    }

    get moraleThresholdsRemoved(): number[] {
        return this._moraleThresholdsRemoved;
    }

    get skills(): ISkill[] {
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

    // ---------------------------------------------


    setWound(part: keyof Wounds, action: AdventureAction, source: string) {
        this._game.chatLog.addMessage(`${this._namePL} odniósł ranę na ${i18n.t(`bodyPart.${part}`, {
            context: "locative"
        })}.`, "red", source);
        this._wounds[part].push(action);
    }

    unsetWound(part: keyof Wounds, action: AdventureAction, source: string) {
        if (!this._wounds[part]) {
            return;
        }
        this._wounds[part] = removeFromArray(this._wounds[part], action);
    }

}
