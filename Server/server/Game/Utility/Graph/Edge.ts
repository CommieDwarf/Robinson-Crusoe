import { IEdge } from "../../../../../interfaces/Graph/Edge";
import { IVertex } from "../../../../../interfaces/Graph/Vertex";

export class Edge<Data> implements IEdge<Data> {
  start: IVertex<Data>;
  end: IVertex<Data>;
  weight: null | number;

  constructor(
    start: IVertex<Data>,
    end: IVertex<Data>,
    weight: null | number = null
  ) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}
