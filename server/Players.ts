import { Character } from "./characters";

import characters from "./characters";

export class Player {
    name: string;
    color: string;
    character: Character;
    id: number;

    constructor(name: string, color: string, character: Character, id: number) {
        this.name = name;
        this.color = color;
        this.character = character;
        this.id = id;
    }
}

const player = new Player("Konrad", "orange", characters.cook, 1);

export default player;