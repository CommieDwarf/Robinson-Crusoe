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
      {
        triggerEffect() {
          threat.specialEffects.argument = true;
        },
        triggerThreatEffect() {
          game.allCharacters.decrDeterminationAllPlayerCharacters(1);
          game.morale.lvlDown(1);
        },
        fullFill(character: ICharacter) {
          game.morale.lvlUp(1);
          character.incrementDetermination(1);
        },
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
      {
        triggerEffect() {
          game.weather.rainCloud = true;
        },
        triggerThreatEffect() {
          game.weather.snowCloud = true;
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
        },
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
      {
        triggerEffect() {
          if (game.allResources.owned.getResource("wood") < 2) {
            game.allCharacters.hurtAllPlayerCharacters(1);
          } else {
            game.allResources.owned.spend("wood", 2);
          }
        },
        triggerThreatEffect() {
          game.allCharacters.hurtAllPlayerCharacters(1);
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
        },
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
      {
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
      {
        triggerEffect() {
          if (game.tilesService.isCampTransitionAvailable()) {
            game.tilesService.forceCampTransition();
          } else {
            game.allCharacters.hurtAllPlayerCharacters(1);
          }
        },
        triggerThreatEffect() {
          // nothing happens
        },
        fullFill(character: ICharacter) {
          const previousCampTile = game.tilesService.previousCampTile;
          if (previousCampTile) {
            if (previousCampTile.builtStructures.roof > 0) {
              game.tilesService.currentCampTile.incrementStructureLvl(
                "roof",
                1
              );
            }
            if (previousCampTile.builtStructures.shelter > 0) {
              game.tilesService.currentCampTile.incrementStructureLvl(
                "palisade",
                1
              );
            }
          }
        },
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
      {
        triggerEffect() {
          game.allCharacters.hurtAllPlayerCharacters(1);
        },
        triggerThreatEffect() {
          game.morale.lvlDown(1);
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
          game.allResources.addResourceToOwned("wood", 1);
        },
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
      {
        triggerEffect() {
          game.allResources.productionBlocked = true;
        },
        triggerThreatEffect() {
          game.allResources.productionBlocked = true;
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(2);
        },
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
      {
        triggerEffect() {
          const beasts = game.beasts.getBeastsFromStack(3);
          const strongestBeast = Beasts.getStrongestBeast(beasts);
          if (strongestBeast) {
            game.beasts.addBeastToDeck(strongestBeast);
          }
        },
        triggerThreatEffect() {
          game.beasts.fightBeast();
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(2);
          game.beasts.swapDeckTopToBottom();
        },
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
      {
        triggerEffect() {
          game.beasts.beastStrengthEnchanted = true;
        },
        triggerThreatEffect() {
          game.structuresService.lvlDownStruct(STRUCTURE.PALISADE, 1);
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
        },
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
      {
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
      {
        triggerEffect() {
          game.weather.rainCloud = true;
        },
        triggerThreatEffect() {
          game.weather.rainCloud = true;
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
        },
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
      {
        triggerEffect() {
          game.actionServices.gather.reRollToken = true;
          game.actionServices.build.reRollToken = true;
          game.actionServices.explore.reRollToken = true;
        },
        triggerThreatEffect() {
          game.actionServices.explore.eventToken = true;
          game.actionServices.gather.eventToken = true;
        },
        fullFill(character: ICharacter) {
          character.incrementDetermination(1);
        },
      }
    ),
  ];
}
