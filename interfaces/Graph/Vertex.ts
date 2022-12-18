import { IEdge } from "./Edge";

export interface IVertex<Data> {
  data: Data;
  edges: IEdge<Data>[];
  prev: IVertex<Data>;
  addEdge: (vertex: IVertex<Data>, weight: null | number) => void;
  removeEdge: (vertex: IVertex<Data>) => void;
}
