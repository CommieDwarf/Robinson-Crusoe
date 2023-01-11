import {
  IPhaseService,
  Phase,
  PhaseEffects,
} from "../../../interfaces/PhaseService/PhaseService";
import {IGame} from "../../../interfaces/Game";
import {MissingLeaderError} from "../Errors/MissingLeaderError";

import {phaseOrder} from "../../../constants/phaseOrder";
import {MissingPawnError} from "../Errors/MissingPawnError";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

export class PhaseService implements IPhaseService {
  private _phase: Phase = "event";
  private _phaseIndex = 0;
  private _game: IGame;

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
      locked: this.locked,
    };
  }

  get phase(): Phase {
    return this._phase;
  }

  get locked() {
    if (this._phase === "action" && !this._game.actionService.finished) {
      return true;
    }
    if (this._game.tileService.resourceAmountToDeplete > 0) {
      return true;
    }

    return false;
  }

  handleError(error: MissingPawnError | MissingLeaderError) {
    let itemName = error.itemName ? error.itemName : "";
    let itemNamePL;
    if (error.itemType === "tile") {
      itemNamePL = " nr. " + itemName;
    } else if (error.itemType === "hunt") {
      itemNamePL = "";
    } else {
      itemNamePL = " - " + itemName;
    }

    const message =
        error instanceof MissingLeaderError
            ? "Pomocnicze pionki nie mogą samodzielnie wykonywać akcji."
            : "Brakuje pionka do wykonania tej akcji";

    this._game.alertService.setAlert(
        `${capitalizeFirstLetter(error.itemType)}${itemNamePL}: ${message}`
    );
  }

  goNextPhase() {
    if (this._phase === "action") {
      if (!this._game.actionService.finished) {
        return;
      }
    }
    try {
      this.phaseEffects[this._phase]();
      this._phaseIndex =
          this._phaseIndex === phaseOrder.length - 1 ? 0 : ++this._phaseIndex;
      this._phase = phaseOrder[this._phaseIndex];
      this._game.alertService.clearAlert();
    } catch (error) {
      if (
          error instanceof MissingLeaderError ||
          error instanceof MissingPawnError
      ) {
        this.handleError(error);
      } else {
        throw error;
      }
    }
  }

  private eventEffect = () => {
    this._game.eventService.moveCardsLeft();
    this._game.eventService.pullCard();
  };

  private moraleEffect = () => {
    if (this._game.moraleService.lvl === 0) {
      return;
    }
    // TODO: implement player choice when lvl 3 whenever he wants determination or health
    const primePlayerCharacter =
        this._game.playerService.primePlayer.getCharacter();
    if (this._game.moraleService.lvl > 0) {
      this._game.characterService.incrDetermination(
          primePlayerCharacter,
          this._game.moraleService.lvl,
          "Faza morali"
      );
    } else {
      this._game.characterService.decrDetermination(
          primePlayerCharacter,
          Math.abs(this._game.moraleService.lvl),
          "Faza morali"
      );
    }
  };

  private productionEffect = () => {
    const resources = this._game.tileService.campTile.tileType?.resources;
    if (!resources) {
      throw new Error("There are no resources in tile");
    }
    const resourceArr = [resources.left, resources.right];

    resourceArr.forEach((res) => {
      if (!res.depleted && res.resource !== "beast") {
        this._game.resourceService.addResourceToOwned(res.resource, 1, "Produkcja");
      }
    })
  };

  private preActionEffect = () => {
    this._game.actionSlotService.checkMissingPawns();
    this._game.actionService.loadItems();
  };

  private actionEffect = () => {
    this._game.actionService.setNextAction();
    this._game.actionService.finished = false;
    this._game.resetPawns();
    this._game.resourceService.addFutureToOwned();
  };

  private weatherEffect = () => {
    this._game.weatherService.applyEffects();
  };

  private nightEffect = () => {
    this._game.setNextRound();
    this._game.tileService.campJustMoved = false;
  };

  private checkPreActionForMissingPawns() {
    // const slots = this._game.actionSlotService.slotsOccupiedAndCategorized;
    //
    // const entries = Object.entries(slots) as Entries<SlotsOccupied>;
    //
    // entries.forEach(([action, slotMap]) => {
    //   if (action === ACTION.REST || action === ACTION.ARRANGE_CAMP) {
    //     return;
    //   }
    //   const items: any[] = [];
    //   slotMap.forEach((pawn, droppableID) => {
    //     items.push(getItemFromDroppableId(droppableID, this._game));
    //   });
    //
    //   items.forEach((item) => {
    //     switch (true) {
    //     }
    //   });
    // });
  }
}
