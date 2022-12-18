import { IQueue } from "../../../../interfaces/Graph/Queue";
import { IVertex } from "../../../../interfaces/Graph/Vertex";

export class Queue<Data> implements IQueue<Data> {
  queue: IVertex<Data>[];
  queueLength: number;

  constructor() {
    this.queue = [];
    this.queueLength = 0;
  }

  enqueue(node: IVertex<Data>) {
    this.queue.push(node);
    this.queueLength++;
    return node;
  }

  dequeue() {
    const vertex = this.queue.shift();
    this.queueLength--;
    if (vertex) {
      return vertex;
    } else {
      return null;
    }
  }

  isEmpty() {
    return this.queueLength == 0;
  }

  getLength() {
    return this.queueLength;
  }

  getEnd() {
    const vertex = this.queue[0];
    if (vertex) {
      return vertex;
    } else {
      return null;
    }
  }
}
