import { IVertex } from "./Vertex";

export interface IQueue<Data> {
  queue: IVertex<Data>[];
  queueLength: number;
  enqueue: (vertex: IVertex<Data>) => IVertex<Data>;
  dequeue: () => IVertex<Data> | null;
  isEmpty: () => boolean;
  getLength: () => number;
  getEnd: () => IVertex<Data> | null;
}
