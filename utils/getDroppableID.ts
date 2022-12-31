export enum ACTION_ITEM {
  CONSTRUCTION = "construction",
  INVENTION = "invention",
  GATHER = "gather",
  EXPLORE = "explore",
  REST = "rest",
  ARRANGE_CAMP = "arrange camp",
  EVENT = "event",
  HUNT = "hunt",
}

export function getDroppableID(
  itemType: ACTION_ITEM,
  name: string | number,
  side: "left" | "right" | "",
  id: number
): string {
  const role = id === 0 ? "leader" : "helper";
  switch (itemType) {
    case ACTION_ITEM.CONSTRUCTION:
      return `construction-${name}-${role}-${id}`;
    case ACTION_ITEM.INVENTION:
      return `invention-${name}-${role}-${id}`;
    case ACTION_ITEM.EXPLORE:
      return `tile-${name}-explore-${role}-${id}`;
    case ACTION_ITEM.GATHER:
      return `tile-${name}-gather-${side}-${role}-${id}`;
    case ACTION_ITEM.REST:
      return `rest-leader-${id}`;
    case ACTION_ITEM.ARRANGE_CAMP:
      return `arrangeCamp-leader-${id}`;
    case ACTION_ITEM.EVENT:
      return `event-${side}-${role}-${id}`;
    case ACTION_ITEM.HUNT:
      return `hunt-${role}-${id}`;
  }
}
