

interface EventCard {
    name: string,
}

export default interface ThreatCards {
    left: EventCard | null,
    right: EventCard | null
}