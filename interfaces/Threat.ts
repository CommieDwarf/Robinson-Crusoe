
export interface ThreatSlotsObj {
    left: EventCard | null;
    right: EventCard | null;
}

export type ThreatSlotsMap = Map<keyof ThreatSlotsObj, EventCard | null>;


export interface IThreat {
    threatSlots: Map<string, keyof EventCard>
}


get threatSlots(): ThreatSlotsMap {
    return this._threatSlots;
}

get leftSlot(): IEventCard | null {
    const left = this.threatSlots.get("left");
    if (left === undefined) {
        throw new Error("Left slot card is undefined");
    }
    return left;
}

get rightSlot(): IEventCard | null {
    const right = this.threatSlots.get("right");
    if (right === undefined) {
        throw new Error("Left slot card is undefined");
    }
    return right;
}

get game(): {} {
    return this._game;
}

getReward(side: "left" | "right", numOfPawns: number) {
    return this.getEventCardFromSlot(side).getReward(numOfPawns);
}

clearThreatSlot(side: "left" | "right") {
    this._threatSlots.set(side, null);
}

triggerThreatEffect(side: "left" | "right", game: {}) {
    this.getEventCardFromSlot(side).triggerThreatEffect(game);
}

getEventCardFromSlot(slot: "left" | "right") {
    const eventCard = this._threatSlots.get(slot);
    if (!eventCard) {
        throw new Error("There isn't card in slot: " + slot);
    }
    return eventCard;
}

moveCardsLeft() {
    const rightCard = this._threatSlots.get("right");
    if (rightCard === undefined) {
        throw new Error("rightCard is undefined for some reason");
    }
    this._threatSlots.set("left", rightCard);
    this._threatSlots.set("right", null);
}