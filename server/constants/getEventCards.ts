import { EventCard } from "../Classes/Threat/EventCard";
import { IGame } from "../../interfaces/Game";
import { EVENT_TYPE, IEventCard } from "../../interfaces/Threat/EventCard";
import { STRUCTURE } from "../../interfaces/Structures/Structure";
import { IThreat } from "../../interfaces/Threat/Threat";
import { Beasts } from "../Classes/Beasts/Beasts";
import { ICharacter } from "../../interfaces/Characters/Character";

export function getEventCards(game: IGame, threat: IThreat): IEventCard[] {
  return [
    new EventCard({
      name: "argument",
      namePL: "kłótnia",
      id: 2,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 2,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      triggerEffect() {
        const THIS = this as EventCard;
        console.log(this, "nameP L");
        threat.setSpecialEffect("argument", true, THIS.namePL);
      },
      triggerThreatEffect() {
        game.allCharacters.decrDeterminationAllPlayerCharacters(1, this.namePL);
        game.morale.lvlDown(1, this.namePL);
      },
      fullFill(character: ICharacter) {
        game.morale.lvlUp(1, this.namePL);
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      },
    }),
    new EventCard({
      name: "awfulWeather",
      namePL: "okropna pogoda",
      id: 3,
      type: EVENT_TYPE.explore,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: {
          wood: 1,
          leather: 0,
          food: 0,
          dryFood: 0,
        },
      },
      triggerEffect() {
        game.weather.rainCloud = true;
      },
      triggerThreatEffect() {
        game.weather.snowCloud = true;
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      },
    }),
    new EventCard({
      name: "coldNight",
      namePL: "niezwykle zimna noc",
      id: 4,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: {
          wood: 1,
          leather: 1,
          food: 0,
          dryFood: 0,
        },
      },

      triggerEffect() {
        if (game.allResources.owned.getResource("wood") < 2) {
          game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
        } else {
          game.allResources.owned.spend("wood", 2);
        }
      },
      triggerThreatEffect() {
        game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      },
    }),
    new EventCard({
      name: "dangerousNight",
      namePL: "niebezpieczna noc",
      id: 5,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: {
          type: STRUCTURE.WEAPON,
          amount: 2,
        },
        resource: null,
      },

      triggerEffect() {
        threat.addCardToTopOfStack(undefined); // TODO: implement beast card;
      },
      triggerThreatEffect() {
        // nothing happens
      },
      fullFill(character: ICharacter) {
        // TODO: shuffle beast from top of the stack into the middle
        threat.shuffleCardInToStack(undefined);
      },
    }),
    new EventCard({
      name: "detachedClouds",
      namePL: "oberwane chmury",
      id: 6,
      type: EVENT_TYPE.gather,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },

      triggerEffect() {
        if (game.tilesService.isCampTransitionAvailable()) {
          game.tilesService.forceCampTransition();
        } else {
          game.allCharacters.hurtAllPlayerCharacters(1, "Oberwane chmury");
        }
      },
      triggerThreatEffect() {
        // nothing happens
      },
      fullFill(character: ICharacter) {
        const previousCampTile = game.tilesService.previousCampTile;
        if (previousCampTile) {
          if (previousCampTile.builtStructures.roof > 0) {
            game.tilesService.currentCampTile.incrementStructureLvl("roof", 1);
          }
          if (previousCampTile.builtStructures.shelter > 0) {
            game.tilesService.currentCampTile.incrementStructureLvl(
              "palisade",
              1
            );
          }
        }
      },
    }),
    new EventCard({
      name: "fallenTree",
      namePL: "powalone drzewo",
      id: 8,
      type: EVENT_TYPE.build,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: "rope",
        structure: null,
        resource: null,
      },
      triggerEffect() {
        game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
      },
      triggerThreatEffect() {
        game.morale.lvlDown(1, this.namePL);
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(1);
        game.allResources.addResourceToOwned("wood", 1);
      },
    }),
    new EventCard({
      name: "fire",
      namePL: "pożar",
      id: 9,
      type: EVENT_TYPE.explore,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: "shovel",
        structure: null,
        resource: null,
      },

      triggerEffect() {
        game.allResources.productionBlocked = true;
      },
      triggerThreatEffect() {
        game.allResources.productionBlocked = true;
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(2);
      },
    }),
    new EventCard({
      name: "forestHowl",
      namePL: "wycie od strony lasu",
      id: 10,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: "fire",
        structure: null,
        resource: null,
      },

      triggerEffect() {
        const beasts = game.beasts.getBeastsFromStack(3);
        const strongestBeast = Beasts.getStrongestBeast(beasts);
        if (strongestBeast) {
          game.beasts.addBeastToDeck(strongestBeast);
        }
      },
      triggerThreatEffect() {
        // game.beasts.fightBeast();
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(2);
        game.beasts.swapDeckTopToBottom();
      },
    }),
    new EventCard({
      name: "nightHowl",
      namePL: "nocne wycie z dżungli",
      id: 11,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: {
          type: STRUCTURE.WEAPON,
          amount: 2,
        },
        resource: null,
      },

      triggerEffect() {
        game.beasts.beastStrengthEnchanted = true;
      },
      triggerThreatEffect() {
        game.structuresService.lvlDownStruct(STRUCTURE.PALISADE, 1);
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      },
    }),
    new EventCard({
      name: "ragingStorm",
      namePL: "rozszalała burza",
      id: 12,
      type: EVENT_TYPE.explore,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      triggerEffect() {
        const weapon = game.structuresService.getStruct(STRUCTURE.WEAPON);
        if (weapon.lvl > 2) {
          weapon.lvl -= 2;
        } else {
          weapon.lvl = 0;
        }
      },
      triggerThreatEffect() {
        // nothing happens
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(1);

        game.structuresService.lvlUpStruct(STRUCTURE.WEAPON, 1);
      },
    }),
    new EventCard({
      name: "rain",
      namePL: "deszcz",
      id: 13,
      type: EVENT_TYPE.gather,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: {
          wood: 0,
          leather: 1,
          dryFood: 0,
          food: 0,
        },
      },

      triggerEffect() {
        game.weather.rainCloud = true;
      },
      triggerThreatEffect() {
        game.weather.rainCloud = true;
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      },
    }),
    new EventCard({
      name: "sleeplessNight",
      namePL: "bezsenna noc",
      id: 14,
      type: EVENT_TYPE.book,
      requirements: {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      triggerEffect() {
        game.actionService.gather.reRollToken = true;
        game.actionService.build.reRollToken = true;
        game.actionService.explore.reRollToken = true;
      },
      triggerThreatEffect() {
        game.actionService.explore.eventToken = true;
        game.actionService.gather.eventToken = true;
      },
      fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      },
    }),
  ];
}
