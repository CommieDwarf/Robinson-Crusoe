import {
    IScenarioService,
    IScenarioServiceRenderData,
    SCENARIO_STATUS,
    ScenarioText,
    WeatherDays,
} from "@shared/types/Game/ScenarioService/ScenarioService";
import {castaways} from "@shared/constants/scenarios/castaways";
import {GAME_STATUS, IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";

export class Castaways implements IScenarioService {

    private readonly _shipRounds = [10, 11, 12]
    private readonly _lastRound = 12;

    private _text: ScenarioText = castaways.text;
    private _status = SCENARIO_STATUS.PENDING;
    private _weather: WeatherDays = castaways.weather;
    private readonly _game: IGame;
    private _woodStashLvl: number = 1;
    private readonly _maxWoodStashLvl: number = 5;

    private _committedWood: number = 0;
    private _scenario = SCENARIO.CASTAWAYS;

    private _lastRoundStashUpgraded = 0;

    constructor(game: IGame) {
        this._game = game;
    }

    get renderData(): IScenarioServiceRenderData {
        return {
            text: this._text,
            weather: this._weather,
            status: this._status,
            woodStashLvl: this._woodStashLvl,
            canAddWood: this.canAddWood(),
            committedWood: this._committedWood,
            isFireBuilt: this.isFireBuilt,
        };
    }

    get committedWood(): number {
        return this._committedWood;
    }

    set status(value: SCENARIO_STATUS) {
        this._status = value;
    }

    get scenario(): SCENARIO.CASTAWAYS {
        return this._scenario;
    }

    get woodStashLvl(): number {
        return this._woodStashLvl;
    }

    get text(): ScenarioText {
        return this._text;
    }

    get status(): SCENARIO_STATUS {
        return this._status;
    }

    get weather(): WeatherDays {
        return this._weather;
    }

    get isFireBuilt() {
        return this._game.inventionService.isBuilt(INVENTION_STARTER.FIRE);
    }

    get lastRound() {
        return this._lastRound;
    }

    public addWood(character: ICharacter) {
        if (this.canAddWood()) {
            this._committedWood++;
            this._game.resourceService.spendBasicResourceIfPossible("wood", 1, "");
            this.addLogMessage(1, character.name);
            if (this._committedWood === this._woodStashLvl) {
                this.lvlUpStash();
            }
        }
    }

    public onItemUse(amount: number, sourceLog: string) {
        if (this._lastRoundStashUpgraded !== this._game.round) {
            const sum = this._committedWood + amount;
            if (sum >= this._woodStashLvl) {
                const realAmountAdded = this._woodStashLvl - this._committedWood;
                this.addLogMessage(realAmountAdded, sourceLog);
                this.lvlUpStash()
            } else {
                this.addLogMessage(sum, sourceLog)
                this._committedWood += amount;
            }
        }
    }


    private canAddWood() {
        return this._lastRoundStashUpgraded !== this._game.round &&
            this._maxWoodStashLvl !== this._woodStashLvl &&
            this._game.resourceService.canAffordResource("wood", 1);
    }

    public lvlUpStash() {
        this._woodStashLvl++;
        this._lastRoundStashUpgraded = this._game.round;
        this._committedWood = 0;
        this.checkScenarioStatus();
    }

    public checkScenarioStatus(): void {
        if (
            this._woodStashLvl === this._maxWoodStashLvl &&
            this._shipRounds.includes(this._game.round) &&
            this._game.inventionService.isBuilt(INVENTION_STARTER.FIRE)
        ) {
            this.setStatus(SCENARIO_STATUS.WIN);
        } else if (
            this._game.round > this._lastRound || this._game.characterService.isAnyPlayerDead)
         {
            this.setStatus(SCENARIO_STATUS.DEFEAT)
        }
    }

    private setStatus(status: SCENARIO_STATUS.WIN | SCENARIO_STATUS.DEFEAT) {
        this._status = status;
        this._game.setEndGameSummary();
    }


    private addLogMessage(woodAdded: number, sourceLog: string) {
        this._game.logService.addMessage({
            code: LOG_CODE.WOOD_ADDED_TO_PILE,
            amount: woodAdded,
            subject1: "",
            subject2: "",
        }, "positive", sourceLog);
    }
}
