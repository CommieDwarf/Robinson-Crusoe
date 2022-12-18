import { Queue } from "./Queue";
import { IGraph } from "../../../../interfaces/Graph/Graph";
import { IVertex } from "../../../../interfaces/Graph/Vertex";
import { Vertex } from "./Vertex";

export class Graph<Data> implements IGraph<Data> {
  isDirected: boolean;
  isWeighted: boolean;
  vertices: IVertex<Data>[];

  constructor(isDirected = false, isWeighted = false) {
    this.isDirected = isDirected;
    this.isWeighted = isWeighted;
    this.vertices = [];
  }

  addVertex(data: Data) {
    let newVertex = new Vertex<Data>(data);
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

  // TODO: PUT DFS INTO WRAPPER METHOD
  DFS(
    currentVertex: IVertex<Data>,
    searched: IVertex<Data>,
    visitedVertices = [currentVertex]
  ): IVertex<Data> | null {
    let found: IVertex<Data> | null = null;
    let edges = currentVertex.edges;
    edges.forEach((edge) => {
      if (!found) {
        let vertex = edge.end;
        vertex.prev = currentVertex;
        if (!visitedVertices.includes(vertex)) {
          visitedVertices.push(vertex);
          if (vertex === searched) {
            found = vertex;
          } else {
            this.DFS(vertex, searched, visitedVertices);
          }
        }
      }
    });
    return found;
  }

  BFS(vertex: IVertex<Data>, searched: IVertex<Data>): IVertex<Data> | null {
    let visitedVertices = [vertex];
    let queue = new Queue<Data>();
    let edges = vertex.edges;
    vertex.prev = null;
    queue.enqueue(vertex);
    let found: null | IVertex<Data>;
    while (queue.getLength() > 0 && !found) {
      const currentVertex = queue.dequeue();
      if (currentVertex) {
        if (currentVertex === searched) {
          found = vertex;
        } else {
          edges = currentVertex.edges;
          edges.forEach((edge) => {
            vertex = edge.end;
            if (!visitedVertices.includes(vertex)) {
              vertex.prev = currentVertex;
              visitedVertices.push(vertex);
              queue.enqueue(vertex);
            }
          });
        }
      }
    }
    return found;
  }

  public static getPath<Data>(lastVertex: IVertex<Data>): IVertex<Data>[] {
    const path = [];
    while (lastVertex.prev) {
      if (!path.includes(lastVertex)) {
        path.push(lastVertex);
      }
      lastVertex = lastVertex.prev;
    }
    return path.reverse();
  }
}
