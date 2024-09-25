"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhaseService = void 0;
const MissingLeaderError_1 = require("../Errors/MissingLeaderError");
const phaseOrder_1 = require("@shared/constants/phaseOrder");
const ActionSlotService_1 = require("../ActionSlotsService/ActionSlotService");
const MissingHelperError_1 = require("../Errors/MissingHelperError");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
const TERMS_1 = require("@shared/types/Terms/TERMS");
class PhaseService {
    constructor(game) {
        this._phase = "event";
        this._phaseIndex = 0;
        this._gainedPhaseEffects = [];
        this.eventEffect = () => {
            this._game.eventService.pullCard();
        };
        this.moraleEffect = () => {
            // TODO: implement player choice when lvl 3 whenever he wants Determination or Health
            this._game.moraleService.triggerPhaseEffect();
        };
        this.productionEffect = () => {
            const id = this._game.tileService.campTile.id;
            this._game.tileService.gather(["left", "right"], id, "production", true);
        };
        this.preActionEffect = () => {
            const occupiedSlots = this._game.actionSlotService.getOccupiedActionSlots();
            ActionSlotService_1.ActionSlotService.checkMissingPawns(occupiedSlots, this._game);
            this._game.actionService.loadItems();
            this._game.actionSlotService.markedActionSlotId = null;
        };
        this.actionEffect = () => {
            this._game.actionService.finished = false;
            this._game.tileService.resetResourceAssignedPawns();
            this._game.inventionService.resetCardPawns();
            this._game.resourceService.addFutureToOwned();
            this._game.tokenService.onActionEnd();
        };
        this.weatherEffect = () => {
            this._game.weatherService.applyEffects();
        };
        this.nightEffect = () => {
            this._game.setNextRound();
            this.eatOrGetHurt();
            this.rotFood();
            this.sleepInShelterOrHurt();
            this._game.globalPawnService.resetPawns();
            this._game.playerService.setNextPrimePlayer();
        };
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
    get phase() {
        return this._phase;
    }
    addPhaseEffect(effect) {
        this._gainedPhaseEffects.push(effect);
    }
    removePhaseEffect(effect) {
        this._gainedPhaseEffects = this._gainedPhaseEffects.filter((func) => func !== effect);
    }
    canGoNextPhase() {
        if (this._game.mysteryService.isDrawingOn ||
            this._game.tileService.isMarkedActionRemaining ||
            this._game.adventureService.currentAdventure ||
            this._game.areObjectsBeingPicked) {
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
    handleMissingPawnError(error) {
        const message = error instanceof MissingLeaderError_1.MissingLeaderError
            ? "Pomocnicze pionki nie mogą samodzielnie wykonywać akcji."
            : "Brakuje pionka do wykonania tej akcji";
        this._game.alertService.setAlert(message);
        this._game.actionSlotService.markedActionSlotId = error.droppableID;
    }
    goNextPhase() {
        if (!this.canGoNextPhase()) {
            return;
        }
        try {
            this.phaseEffects[this._phase]();
            this._gainedPhaseEffects.forEach((func) => func());
            this._phaseIndex =
                this._phaseIndex === phaseOrder_1.phaseOrder.length - 1 ? 0 : ++this._phaseIndex;
            this._phase = phaseOrder_1.phaseOrder[this._phaseIndex];
            this._game.alertService.clearAlert();
            this._game.actionSlotService.markedActionSlotId = null;
        }
        catch (error) {
            if (error instanceof MissingLeaderError_1.MissingLeaderError ||
                error instanceof MissingHelperError_1.MissingHelperError) {
                this.handleMissingPawnError(error);
            }
            else {
                throw error;
            }
        }
    }
    eatOrGetHurt() {
        this._game.playerService.players.forEach((player) => {
            const character = player.getCharacter();
            if (this._game.resourceService.canAffordResource("food", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
                this._game.logService.addMessage({
                    code: LOG_CODE_1.LOG_CODE.CHARACTER_EATS,
                    subject1: character.name,
                    subject2: "food",
                    amount: 1,
                }, "neutral", TERMS_1.TERMS.NIGHT);
            }
            else if (this._game.resourceService.canAffordResource("dryFood", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible("dryFood", 1, "");
                this._game.logService.addMessage({
                    code: LOG_CODE_1.LOG_CODE.CHARACTER_EATS,
                    subject1: character.name,
                    subject2: "dry food",
                    amount: 1,
                }, "neutral", TERMS_1.TERMS.NIGHT);
            }
            else {
                this._game.characterService.hurt(character, 1, "Brak pożywienia");
            }
        });
    }
    rotFood() {
        if (!this._game.mysteryService.hasTreasureCard(MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOXES) &&
            !this._game.inventionService.isBuilt(Invention_1.INVENTION_NORMAL.CELLAR)) {
            this._game.resourceService.spendBasicResourceIfPossible("food", Infinity, LOG_CODE_1.LOG_CODE.FOOD_ROTTED);
        }
    }
    sleepInShelterOrHurt() {
        var _a;
        if (!this._game.constructionService.isBuilt(Construction_1.CONSTRUCTION.SHELTER) && !((_a = this._game.tileService.campTile.tileResourceService) === null || _a === void 0 ? void 0 : _a.extras.naturalShelter)) {
            this._game.characterService.hurtAllPlayerCharacters(1, TERMS_1.TERMS.SLEEPING_UNDER_OPEN_SKY);
        }
    }
}
exports.PhaseService = PhaseService;
//# sourceMappingURL=PhaseService.js.map