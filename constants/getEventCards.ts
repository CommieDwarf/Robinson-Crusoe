import { EventCard } from "../server/Classes/EventCard/EventCard";
import { IGame } from "../interfaces/Game";
import { EVENT_TYPE, IEventCard } from "../interfaces/Threat/EventCard";
import { STRUCTURE } from "../interfaces/Structures/Structure";
import { IThreat } from "../interfaces/Threat/Threat";
import { Beasts } from "../server/Classes/Beasts/Beasts";
import { ICharacter } from "../interfaces/Characters/Character";
import { Resources } from "../server/Classes/ResourceService/Resources";

export function getEventCards(game: IGame, threat: IThreat): IEventCard[] {
  return [
    new EventCard(
      "argument",
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
        game.characterService.decrDeterminationAllPlayerCharacters(
          1,
          this.namePL
        );
        game.morale.lvlDown(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        game.morale.lvlUp(1, this.namePL);

        game.characterService.incrDetermination(character, 1, this.namePL);
      }
    ),
    new EventCard(
      "awfulWeather",
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
        game.weatherService.tokens.rain = true;
      },
      function triggerThreatEffect() {
        game.weatherService.tokens.snow = true;
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(
          character,
          1,
          `${this.namePL} (${character.namePL})`
        );
      }
    ),
    new EventCard(
      "coldNight",
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
        const resources = new Resources(0, 0, 2, 0);
        if (!game.allResources.canOwnedAfford(resources)) {
          game.characterService.hurtAllPlayerCharacters(1, this.namePL);
        } else {
          game.allResources.spendFromOwned("wood", 2, this.namePL);
        }
      },
      function triggerThreatEffect() {
        game.characterService.hurtAllPlayerCharacters(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(character, 1, this.namePL);
      }
    ),
    new EventCard(
      "dangerousNight",
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
          game.characterService.hurtAllPlayerCharacters(1, "Oberwane chmury");
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
        game.characterService.hurtAllPlayerCharacters(1, this.namePL);
      },
      function triggerThreatEffect() {
        game.morale.lvlDown(1, this.namePL);
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(character, 1, this.namePL);
        game.allResources.addResourceToOwned("wood", 1, this.namePL);
      }
    ),
    new EventCard(
      "fire",
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
        game.characterService.incrDetermination(character, 2, this.namePL);
      }
    ),
    new EventCard(
      "forestHowl",
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
          game.chatLog.addMessage(
            "Najsilniejsza bestia z 3 pierwszych została wtasowana do talii wydarzeń",
            "red",
            this.namePL
          );
        }
      },
      function triggerThreatEffect() {
        // Play.beasts.fightBeast();
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(character, 2, this.namePL);
        game.beasts.swapDeckTopToBottom();
        game.chatLog.addMessage(
          "Bestia została przeniesiona na dno talii",
          "green",
          this.namePL
        );
      }
    ),
    new EventCard(
      "nightHowl",
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
        game.structuresService.lvlDownStruct(
          STRUCTURE.PALISADE,
          1,
          this.namePL
        );
      },
      function fullFill(character: ICharacter) {
        this.game?.characterService.incrDetermination(
          character,
          1,
          this.namePL
        );
      }
    ),
    new EventCard(
      "ragingStorm",
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
        game.characterService.incrDetermination(character, 1, this.namePL);

        game.structuresService.lvlUpStruct(STRUCTURE.WEAPON, 1, this.namePL);
      }
    ),
    new EventCard(
      "rain",
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
        game.weatherService.tokens.rain = true;
      },
      function triggerThreatEffect() {
        game.weatherService.tokens.rain = true;
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(character, 1, this.namePL);
      }
    ),
    new EventCard(
      "sleeplessNight",
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
        game.actionService.resolvableActionServices.gather.reRollToken = true;
        game.actionService.resolvableActionServices.build.reRollToken = true;
        game.actionService.resolvableActionServices.explore.reRollToken = true;
      },
      function triggerThreatEffect() {
        game.actionService.resolvableActionServices.explore.eventToken = true;
        game.actionService.resolvableActionServices.gather.eventToken = true;
      },
      function fullFill(character: ICharacter) {
        game.characterService.incrDetermination(character, 1, this.namePL);
      }
    ),
  ];
}
