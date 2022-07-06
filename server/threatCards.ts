
export class EventCard {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}


const threatCards = {
    left: null,
    right: new EventCard("supply-crates")
}

export default threatCards