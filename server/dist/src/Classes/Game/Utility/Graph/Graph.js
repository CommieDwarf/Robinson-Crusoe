"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const Queue_1 = require("./Queue");
const Vertex_1 = require("./Vertex");
class Graph {
    constructor(isDirected = false, isWeighted = false) {
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.vertices = [];
    }
    addVertex(data, id) {
        let newVertex = new Vertex_1.Vertex(data, id);
        this.vertices.push(newVertex);
        return newVertex;
    }
    removeVertex(vertex) {
        if (vertex instanceof Vertex_1.Vertex) {
            this.vertices = this.vertices.filter((v) => v != vertex);
        }
        else {
            throw new Error("Must be an instance of Vertex");
        }
    }
    addEdge(vertexOne, vertexTwo, weight) {
        if (vertexOne instanceof Vertex_1.Vertex && vertexTwo instanceof Vertex_1.Vertex) {
            vertexOne.addEdge(vertexTwo, weight);
            if (!this.isDirected) {
                vertexTwo.addEdge(vertexOne, weight);
            }
        }
        else {
            throw new Error("Must be an instance of Vertex");
        }
    }
    removeEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex_1.Vertex && vertexTwo instanceof Vertex_1.Vertex) {
            vertexOne.removeEdge(vertexTwo);
            if (!this.isWeighted) {
                vertexTwo.removeEdge(vertexOne);
            }
        }
    }
    print() {
        this.vertices.forEach((vertex) => {
            let vertices = vertex.edges;
            let edges = vertices.map((e) => {
                let weight = this.isWeighted ? " (" + e.weight + ")" : "";
                return e.end.data + weight;
            });
            console.log(vertex.data, " -> ", edges.join(" , "));
        });
    }
    DFS(vertex, searched) {
        throw new Error("not implemented");
    }
    BFS(vertex, searched) {
        let visitedVertices = [vertex];
        let queue = new Queue_1.Queue();
        let edges = vertex.edges;
        vertex.prev = null;
        queue.enqueue(vertex);
        let found = false;
        while (queue.getLength() > 0 && !found) {
            const currentVertex = queue.dequeue();
            if (currentVertex) {
                if (currentVertex === searched) {
                    visitedVertices.push(currentVertex);
                    found = true;
                }
                else {
                    edges = currentVertex.edges;
                    edges.forEach((edge) => {
                        vertex = edge.end;
                        if (!visitedVertices.includes(vertex) && !vertex.data.modifiers.flipped) {
                            vertex.prev = currentVertex;
                            visitedVertices.push(vertex);
                            queue.enqueue(vertex);
                        }
                    });
                }
            }
        }
        return visitedVertices;
    }
    getShortestPath(startID, searchedID) {
        const start = this.getVertex(startID);
        const searched = this.getVertex(searchedID);
        const visitedVertices = this.BFS(start, searched);
        if (visitedVertices.length > 0) {
            const path = this.backTracePath(searched);
            this.clearTracks();
            return path;
        }
        else {
            return [];
        }
    }
    backTracePath(searched) {
        const path = [];
        let lastVertex = searched;
        while (lastVertex.prev) {
            if (!path.includes(lastVertex)) {
                path.push(lastVertex);
            }
            lastVertex = lastVertex.prev;
        }
        return path.reverse();
    }
    clearTracks() {
        this.vertices.forEach((vertex) => (vertex.prev = null));
    }
    getVertex(id) {
        const vertex = this.vertices.find((vertex) => vertex.id == id);
        if (!vertex) {
            throw new Error("Couldn't find vertex with id: " + id);
        }
        return vertex;
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map