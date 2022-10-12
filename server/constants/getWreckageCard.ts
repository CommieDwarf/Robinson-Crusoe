import {IGame} from "../../interfaces/Game";
import {IThreat} from "../../interfaces/Threat/Threat";
import {EVENT_TYPE, IEventCard} from "../../interfaces/Threat/EventCard";
import {EventCard} from "../Classes/Threat/EventCard";
import {ICharacter} from "../../interfaces/Characters/Character";

export function getWreckageCard(game: IGame, threat: IThreat): IEventCard {


    // TODO: implement more wreckage cards and return random
    return new EventCard(
        "supplyCrates",
        "skrzynie z jedzeniem",
        1,
        EVENT_TYPE.wreckage,
        {
            pawns: 1,
            optionalPawns: 1,
            invention: null,
            structure: null,
            resource: null,
        },
        {
            triggerEffect() {
                //nothing happens
            },
            triggerThreatEffect() {
                // nothing happens
            },
            fullFill(character: ICharacter, helper: ICharacter | null = null) {
                game.allResources.addResourceToOwned("food", 1);
                if (helper) {
                    game.allResources.addResourceToOwned("dryFood", 1);
                }
            },
        }
    );
}