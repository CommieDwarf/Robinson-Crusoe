import { EventCard } from "../Classes/Threat/EventCard";
import { IGame } from "../../interfaces/Game";
import { EVENT_TYPE, IEventCard } from "../../interfaces/Threat/EventCard";
import { STRUCTURE } from "../../interfaces/Structures/Structure";
import { IThreat } from "../../interfaces/Threat/Threat";
import { Beasts } from "../Classes/Beasts/Beasts";
import { ICharacter } from "../../interfaces/Characters/Character";

export function getEventCards(game: IGame, threat: IThreat): IEventCard[] {
  return [
    new EventCard(
      "argument",
      "kłótnia",
      2,
      EVENT_TYPE.book,
      {
        pawns: 2,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      function triggerEffect() {
        threat.setSpecialEffect("argument", true, this.namePL);
      },
      function triggerThreatEffect() {
        game.allCharacters.decrDeterminationAllPlayerCharacters(1, this.namePL);
        game.morale.lvlDown(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        game.morale.lvlUp(1, this.namePL);
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      }
    ),
    new EventCard(
      "awfulWeather",
      "okropna pogoda",
      3,
      EVENT_TYPE.explore,
      {
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
      function triggerEffect() {
        game.weather.rainCloud = true;
      },
      function triggerThreatEffect() {
        game.weather.snowCloud = true;
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      }
    ),
    new EventCard(
      "coldNight",
      "niezwykle zimna noc",
      4,
      EVENT_TYPE.book,
      {
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
      function triggerEffect() {
        if (game.allResources.owned.getResource("wood") < 2) {
          game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
        } else {
          game.allResources.owned.spend("wood", 2);
        }
      },
      function triggerThreatEffect() {
        game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(
          1,
          `${this.namePL} (${character.namePL})`
        );
      }
    ),
    new EventCard(
      "dangerousNight",
      "niebezpieczna noc",
      5,
      EVENT_TYPE.book,
      {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: {
          type: STRUCTURE.WEAPON,
          amount: 2,
        },
        resource: null,
      },

      function triggerEffect() {
        threat.addCardToTopOfStack(undefined); // TODO: implement beast card;
      },
      function triggerThreatEffect() {
        // nothing happens
      },
      function fullFill(character: ICharacter) {
        // TODO: shuffle beast from top of the stack into the middle
        threat.shuffleCardInToStack(undefined);
      }
    ),
    new EventCard(
      "detachedClouds",
      "oberwane chmury",
      6,
      EVENT_TYPE.gather,
      {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },

      function triggerEffect() {
        if (game.tilesService.isCampTransitionAvailable()) {
          game.tilesService.forceCampTransition();
        } else {
          game.allCharacters.hurtAllPlayerCharacters(1, "Oberwane chmury");
        }
      },
      function triggerThreatEffect() {
        // nothing happens
      },
      function fullFill(character: ICharacter) {
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
      }
    ),
    new EventCard(
      "fallenTree",
      "powalone drzewo",
      8,
      EVENT_TYPE.build,
      {
        pawns: 1,
        optionalPawns: null,
        invention: "rope",
        structure: null,
        resource: null,
      },
      function triggerEffect() {
        game.allCharacters.hurtAllPlayerCharacters(1, this.namePL);
      },
      function triggerThreatEffect() {
        game.morale.lvlDown(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(1);
        game.allResources.addResourceToOwned("wood", 1);
      }
    ),
    new EventCard(
      "fire",
      "pożar",
      9,
      EVENT_TYPE.explore,
      {
        pawns: 1,
        optionalPawns: null,
        invention: "shovel",
        structure: null,
        resource: null,
      },

      function triggerEffect() {
        game.allResources.productionBlocked = true;
      },
      function triggerThreatEffect() {
        game.allResources.productionBlocked = true;
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(2);
      }
    ),
    new EventCard(
      "forestHowl",
      "wycie od strony lasu",
      10,
      EVENT_TYPE.book,
      {
        pawns: 1,
        optionalPawns: null,
        invention: "fire",
        structure: null,
        resource: null,
      },

      function triggerEffect() {
        const beasts = game.beasts.getBeastsFromStack(3);
        const strongestBeast = Beasts.getStrongestBeast(beasts);
        if (strongestBeast) {
          game.beasts.addBeastToDeck(strongestBeast);
        }
      },
      function triggerThreatEffect() {
        // game.beasts.fightBeast();
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(2);
        game.beasts.swapDeckTopToBottom();
      }
    ),
    new EventCard(
      "nightHowl",
      "nocne wycie z dżungli",
      11,
      EVENT_TYPE.book,
      {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: {
          type: STRUCTURE.WEAPON,
          amount: 2,
        },
        resource: null,
      },

      function triggerEffect() {
        game.beasts.beastStrengthEnchanted = true;
      },
      function triggerThreatEffect() {
        game.structuresService.lvlDownStruct(STRUCTURE.PALISADE, 1);
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      }
    ),
    new EventCard(
      "ragingStorm",
      "rozszalała burza",
      12,
      EVENT_TYPE.explore,
      {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      function triggerEffect() {
        const weapon = game.structuresService.getStruct(STRUCTURE.WEAPON);
        if (weapon.lvl > 2) {
          weapon.lvl -= 2;
        } else {
          weapon.lvl = 0;
        }
      },
      function triggerThreatEffect() {
        // nothing happens
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(1);

        game.structuresService.lvlUpStruct(STRUCTURE.WEAPON, 1);
      }
    ),
    new EventCard(
      "rain",
      "deszcz",
      13,
      EVENT_TYPE.gather,
      {
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

      function triggerEffect() {
        game.weather.rainCloud = true;
      },
      function triggerThreatEffect() {
        game.weather.rainCloud = true;
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      }
    ),
    new EventCard(
      "sleeplessNight",
      "bezsenna noc",
      14,
      EVENT_TYPE.book,
      {
        pawns: 1,
        optionalPawns: null,
        invention: null,
        structure: null,
        resource: null,
      },
      function triggerEffect() {
        game.actionService.gather.reRollToken = true;
        game.actionService.build.reRollToken = true;
        game.actionService.explore.reRollToken = true;
      },
      function triggerThreatEffect() {
        game.actionService.explore.eventToken = true;
        game.actionService.gather.eventToken = true;
      },
      function fullFill(character: ICharacter) {
        character.incrementDetermination(1);
      }
    ),
  ];
}
