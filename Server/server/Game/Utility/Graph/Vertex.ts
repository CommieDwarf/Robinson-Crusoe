import { Edge } from "./Edge";
import { IVertex } from "../../../../../interfaces/Graph/Vertex";
import { IEdge } from "../../../../../interfaces/Graph/Edge";

export class Vertex<Data> implements IVertex<Data> {
  data: any;
  edges: IEdge<Data>[];
  prev: null | IVertex<Data> = null;
  id: number | string;

  constructor(data: any, id: number | string) {
    this.data = data;
    this.edges = [];
    this.id = id;
  }

  addEdge(vertex: IVertex<Data>, weight: number | null = null) {
    let edge = new Edge(this, vertex, weight);
    if (!this.edges.some((e) => e.end == edge.end)) {
      this.edges.push(edge);
    }
  }

  removeEdge(vertex: IVertex<Data>) {
    this.edges = this.edges.filter(function (v) {
      return v.end !== vertex;
    });
  }
}
