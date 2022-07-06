import IPawn from "../interfaces/Pawn";
import ICharacter from "../interfaces/Character";
import player, { Player } from "./Players";
import characters, { Character } from "./characters";


export class Pawn implements IPawn {
    id: string;
    character: ICharacter;
    constructor(id: string, character: ICharacter) {
        this.id = id;
        this.character = character;
    }
}

const pawns = new Map<string, Pawn>();



export function getPawnId(playerId: number, character: Character, id: number) {
    return "player" + playerId + "character" + character.id + "pawn" + id;
}


// pawns.set(getPawnId(player, 0), new Pawn(0, player.character));
// pawns.set(getPawnId(player, 1), new Pawn(1, player.character));

export default pawns;