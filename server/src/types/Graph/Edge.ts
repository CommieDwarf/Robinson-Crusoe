import {IVertex} from "./Vertex";

export interface IEdge<Data> {
  start: IVertex<Data>;
  end: IVertex<Data>;
  weight: number | null;
}
