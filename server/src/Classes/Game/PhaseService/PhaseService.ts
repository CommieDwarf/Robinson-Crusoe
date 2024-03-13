import {IPhaseService, Phase, PhaseEffects,} from "@shared/types/Game/PhaseService/PhaseService";
import {IGame} from "@shared/types/Game/Game";
import {MissingLeaderError} from "../Errors/MissingLeaderError";

import {phaseOrder} from "@shared/constants/phaseOrder";
import {ActionSlotService} from "../ActionSlotsService/ActionSlotService";
import {MissingHelperError} from "../Errors/MissingHelperError";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {INVENTION_NORMAL} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TERMS} from "@shared/types/Terms/TERMS";

export class PhaseService implements IPhaseService {
    private _phase: Phase = "event";
    private _phaseIndex = 0;
    private readonly _game: IGame;
    private _gainedPhaseEffects: Function[] = []

    phaseEffects: PhaseEffects;

    constructor(game: IGame) {
        this._game = game;
        this.phaseEffects = {
            event: this.eventEffect,
            morale: this.moraleEffect,
            production: this.productionEffect,
            preAction: this.preActionEffect,
            action: this.actionEffect,
            weather: this.weatherEffect,
            night: this.nightEffect,
        };
    }

    get renderData() {
        return {
            phase: this._phase,
            locked: !this.canGoNextPhase(),
        };
    }

    get phase(): Phase {
        return this._phase;
    }


    public addPhaseEffect(effect: Function) {
        this._gainedPhaseEffects.push(effect);
    }

    public removePhaseEffect(effect: Function) {
        this._gainedPhaseEffects = this._gainedPhaseEffects.filter((func) => func !== effect);
    }

    public canGoNextPhase() {
        if (this._game.mysteryService.isDrawingOn) {
            return false;
        }
        if (this._game.tileService.isTileMarkedForAction) {
            return false;
        }

        if (this._game.adventureService.currentAdventure) {
            return false;
        }

        switch (this._phase) {
            case "event":
                return this._game.eventService.canGoNextPhase();
            case "action":
                return this._game.actionService.finished;
            case "weather":
                return !(this._game.weatherService.shouldRollDices &&
                    !this._game.weatherService.rollDiceResult);
        }

        return true;
    }

    handleMissingPawnError(error: MissingHelperError | MissingLeaderError) {
        const message =
            error instanceof MissingLeaderError
                ? "Pomocnicze pionki nie mogą samodzielnie wykonywać akcji."
                : "Brakuje pionka do wykonania tej akcji";

        this._game.alertService.setAlert(message);
        this._game.actionSlotService.pawnDropIDAlert = error.droppableID;
    }

    goNextPhase() {
        if (!this.canGoNextPhase()) {
            return;
        }
        try {
            this.phaseEffects[this._phase]();
            this._gainedPhaseEffects.forEach((func) => func());
            this._phaseIndex =
                this._phaseIndex === phaseOrder.length - 1 ? 0 : ++this._phaseIndex;
            this._phase = phaseOrder[this._phaseIndex];
            this._game.alertService.clearAlert();
            this._game.actionSlotService.pawnDropIDAlert = null;
        } catch (error) {
            if (
                error instanceof MissingLeaderError ||
                error instanceof MissingHelperError
            ) {
                this.handleMissingPawnError(error);
            } else {
                throw error;
            }
        }
    }

    private eventEffect = () => {
        this._game.eventService.pullCard();
    };

    private moraleEffect = () => {
        // TODO: implement player choice when lvl 3 whenever he wants Determination or Health
        this._game.moraleService.triggerPhaseEffect();
    };

    private productionEffect = () => {
        const id = this._game.tileService.campTile.id;
        this._game.tileService.gather("left", id, "production", true);
        this._game.tileService.gather("right", id, "production", true);
    };

    private preActionEffect = () => {
        const occupiedSlots = this._game.actionSlotService.getOccupiedActionSlots();
        ActionSlotService.checkMissingPawns(occupiedSlots, this._game);
        this._game.actionService.loadItems();
        this._game.actionSlotService.pawnDropIDAlert = null;
    };

    private actionEffect = () => {
        this._game.actionService.finished = false;
        this._game.tileService.resetResourceAssignedPawns();
        this._game.inventionService.resetCardPawns();
        this._game.resourceService.addFutureToOwned();
        this._game.tokenService.onActionEnd();
    };

    private weatherEffect = () => {
        this._game.weatherService.applyEffects();
    };

    private nightEffect = () => {
        this._game.setNextRound();
        this._game.tileService.campJustMoved = false;
        //TODO: IMPLEMENT EATING;
        this.eatOrGetHurt();
        this.rotFood();
        this.sleepInShelterOrHurt();
        this._game.resetPawns();
    };


    private eatOrGetHurt() {
        this._game.playerService.players.forEach((player) => {
            const character = player.getCharacter();
            if (this._game.resourceService.canAffordResource("food", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible(
                    "food",
                    1,
                    "");
                this._game.logService.addMessage({
                    code: LOG_CODE.CHARACTER_EATS,
                    subject1: character.name,
                    subject2: "food",
                    amount: 1,
                }, "neutral", TERMS.NIGHT)
            } else if (this._game.resourceService.canAffordResource("dryFood", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible(
                    "dryFood",
                    1,
                    "")
                this._game.logService.addMessage({
                    code: LOG_CODE.CHARACTER_EATS,
                    subject1: character.name,
                    subject2: "dry food",
                    amount: 1,
                }, "neutral", TERMS.NIGHT)
            } else {
                this._game.characterService.hurt(character, 1, "Brak pożywienia");
            }
        })
    }

    private rotFood() {
        if (!this._game.mysteryService.hasTreasureCard(TREASURE_MYSTERY_CARD.BOXES) &&
            !this._game.inventionService.isBuilt(INVENTION_NORMAL.CELLAR)
        ) {
            this._game.resourceService.spendBasicResourceIfPossible("food", Infinity, LOG_CODE.FOOD_ROTTED);
        }
    }

    private sleepInShelterOrHurt() {
        if (!this._game.constructionService.isBuilt(CONSTRUCTION.SHELTER) && !this._game.tileService.campTile.tileResourceService?.extras.naturalShelter) {
            this._game.characterService.hurtAllPlayerCharacters(1, TERMS.SLEEPING_UNDER_OPEN_SKY);
        }
    }
}
