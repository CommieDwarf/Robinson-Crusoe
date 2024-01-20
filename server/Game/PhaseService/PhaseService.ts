import {IPhaseService, Phase, PhaseEffects,} from "../../../interfaces/PhaseService/PhaseService";
import {IGame} from "../../../interfaces/Game";
import {MissingLeaderError} from "../Errors/MissingLeaderError";

import {phaseOrder} from "../../../constants/phaseOrder";
import {ActionSlotService} from "../ActionSlotsService/ActionSlotService";
import {MissingHelperError} from "../Errors/MissingHelperError";
import {TREASURE_MYSTERY_CARD} from "../../../interfaces/MysteryService/MYSTERY_CARD";
import {INVENTION_NORMAL} from "../../../interfaces/InventionService/Invention";

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
        switch (this._phase) {
            case "event":
                return this._game.eventService.canGoNextPhase();
            case "action":
                return this._game.actionService.finished;
            case "weather":
                return this._game.weatherService.shouldRollDices &&
                !this._game.weatherService.rollDiceResult ? false : true;
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
    };

    private moraleEffect = () => {
        // TODO: implement player choice when lvl 3 whenever he wants determination or health
        this._game.moraleService.triggerPhaseEffect();
    };

    private productionEffect = () => {
        const id = this._game.tileService.campTile.id;
        this._game.tileService.gather("left", id, "produkcja", true);
        this._game.tileService.gather("right", id, "produkcja", true);
    };

    private preActionEffect = () => {
        const occupiedSlots = this._game.actionSlotService.getOccupiedActionSlots();
        ActionSlotService.checkMissingPawns(occupiedSlots, this._game);
        this._game.actionService.loadItems();
        this._game.actionSlotService.pawnDropIDAlert = null;
    };

    private actionEffect = () => {
        this._game.actionService.finished = false;
        this._game.resetPawns();
        this._game.tileService.resetResourceAssignedPawns();
        this._game.inventionService.resetCardPawns();
        this._game.resourceService.addFutureToOwned();
    };

    private weatherEffect = () => {
        this._game.weatherService.applyEffects();
    };

    private nightEffect = () => {
        this._game.setNextRound();
        this._game.tileService.campJustMoved = false;
        //TODO: IMPLEMENT EATING;
        this._game.playerService.players.forEach((player) => {
            const character = player.getCharacter();
            if (this._game.resourceService.canAffordResource("food", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible(
                    "food",
                    1,
                    "")
                this._game.chatLog.addMessage(`${character.namePL} spożywa 1 pożywienie`, "neutral", "noc");
            } else {
                this._game.characterService.hurt(character, 1, "Brak pożywienia");
            }
        })
        if (!this._game.mysteryService.hasTresureCard(TREASURE_MYSTERY_CARD.BOXES) &&
            !this._game.inventionService.isBuilt(INVENTION_NORMAL.CELLAR)
        ) {
            this._game.resourceService.spendBasicResourceIfPossible("food", Infinity, "Jedzenie gnije");
        }

        this._game.eventService.pullCard();
    };


}
