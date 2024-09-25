"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
const Edge_1 = require("./Edge");
class Vertex {
    constructor(data, id) {
        this.prev = null;
        this.data = data;
        this.edges = [];
        this.id = id;
    }
    addEdge(vertex, weight = null) {
        let edge = new Edge_1.Edge(this, vertex, weight);
        if (!this.edges.some((e) => e.end == edge.end)) {
            this.edges.push(edge);
        }
    }
    removeEdge(vertex) {
        this.edges = this.edges.filter(function (v) {
            return v.end !== vertex;
        });
    }
}
exports.Vertex = Vertex;
//# sourceMappingURL=Vertex.js.map