import {
    IScenarioService,
    IScenarioServiceRenderData,
    SCENARIO_STATUS,
    ScenarioText,
    WeatherDays,
} from "../../../interfaces/ScenarioService/ScenarioService";
import {castaways} from "../../../constants/scenarios/castaways";
import {IGame} from "../../../interfaces/Game";
import {INVENTION_STARTER} from "../../../interfaces/InventionService/Invention";

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
    private _name: "castaways" = "castaways";

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

    get name(): "castaways" {
        return this._name;
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

    public addWood() {
        console.log(this.canAddWood(), " CAN ADD WOOD")
        if (this.canAddWood()) {
            this._committedWood++;
            this._game.resourceService.spendBasicResourceIfPossible("wood", 1, "");
            if (this._committedWood === this._woodStashLvl) {
                this.lvlUpStash();
            }
        }
    }

    public onMastBuild() {
        if (this._lastRoundStashUpgraded !== this._game.round) {
            const sum = this._committedWood + 3;
            if (sum >= this._woodStashLvl) {
                this._committedWood = this._woodStashLvl;
                this.lvlUpStash()
            } else {
                this._committedWood += 3;
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
        this.checkWinLoseStatus();
    }

    checkWinLoseStatus(): void {
        if (
            this._woodStashLvl === this._maxWoodStashLvl &&
            this._shipRounds.includes(this._game.round)
        ) {
            this._status = SCENARIO_STATUS.WIN;
        } else if (this._game.round > this._lastRound) {
            this._status = SCENARIO_STATUS.DEFEAT;
        }
    }
}
