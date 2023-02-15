export interface MissingPawnError extends Error {
  droppableID: string;
}