import {Queue} from "./Queue";
import {IGraph} from "@shared/types/Game/Graph/Graph";
import {IVertex} from "@shared/types/Game/Graph/Vertex";
import {Vertex} from "./Vertex";

export class Graph<Data> implements IGraph<Data> {
    isDirected: boolean;
    isWeighted: boolean;
    vertices: IVertex<Data>[];

    constructor(isDirected = false, isWeighted = false) {
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.vertices = [];
    }

    addVertex(data: Data, id: string | number) {
        let newVertex = new Vertex<Data>(data, id);
        this.vertices.push(newVertex);
        return newVertex;
    }

    removeVertex(vertex: IVertex<Data>) {
        if (vertex instanceof Vertex) {
            this.vertices = this.vertices.filter((v) => v != vertex);
        } else {
            throw new Error("Must be an instance of Vertex");
        }
    }

    addEdge(
        vertexOne: IVertex<Data>,
        vertexTwo: IVertex<Data>,
        weight: number | null
    ) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.addEdge(vertexTwo, weight);
            if (!this.isDirected) {
                vertexTwo.addEdge(vertexOne, weight);
            }
        } else {
            throw new Error("Must be an instance of Vertex");
        }
    }

    removeEdge(vertexOne: IVertex<Data>, vertexTwo: IVertex<Data>) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
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

    DFS(vertex: IVertex<Data>, searched: IVertex<Data>): IVertex<Data>[] {
        throw new Error("not implemented");
    }

    BFS(vertex: Vertex<Data>, searched: Vertex<Data>): IVertex<Data>[] {
        let visitedVertices = [vertex];
        let queue = new Queue<Data>();
        let edges = vertex.edges;
        vertex.prev = null;
        queue.enqueue(vertex);
        let found: boolean = false;
        while (queue.getLength() > 0 && !found) {
            const currentVertex = queue.dequeue();
            if (currentVertex) {
                if (currentVertex === searched) {
                    visitedVertices.push(currentVertex);
                    found = true;
                } else {
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

    public getShortestPath(
        startID: string | number,
        searchedID: string | number
    ): IVertex<Data>[] {
        const start = this.getVertex(startID);
        const searched = this.getVertex(searchedID);
        const visitedVertices = this.BFS(start, searched);
        if (visitedVertices.length > 0) {
            const path = this.backTracePath(searched);
            this.clearTracks();
            return path;
        } else {
            return [];
        }
    }

    private backTracePath(searched: IVertex<Data>) {
        const path: IVertex<Data>[] = [];
        let lastVertex = searched;
        while (lastVertex.prev) {
            if (!path.includes(lastVertex)) {
                path.push(lastVertex);
            }
            lastVertex = lastVertex.prev;
        }
        return path.reverse();
    }

    private clearTracks() {
        this.vertices.forEach((vertex) => (vertex.prev = null));
    }

    getVertex(id: string | number): IVertex<Data> {
        const vertex = this.vertices.find((vertex) => vertex.id == id);
        if (!vertex) {
            throw new Error("Couldn't find vertex with id: " + id);
        }
        return vertex;
    }
}
