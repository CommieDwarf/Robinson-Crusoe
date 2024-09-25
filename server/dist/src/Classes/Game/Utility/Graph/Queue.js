"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this.queue = [];
        this.queueLength = 0;
    }
    enqueue(node) {
        this.queue.push(node);
        this.queueLength++;
        return node;
    }
    dequeue() {
        const vertex = this.queue.shift();
        this.queueLength--;
        if (vertex) {
            return vertex;
        }
        else {
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
        }
        else {
            return null;
        }
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map