import { IVertex } from "./Vertex";

export interface IGraph<Data> {
  isDirected: boolean;
  isWeighted: boolean;
  vertices: IVertex<Data>[];

  addVertex: (data: Data) => void;
  removeVertex: (vertex: IVertex<Data>) => void;
  addEdge: (
    vertexOne: IVertex<Data>,
    vertexTwo: IVertex<Data>,
    weight: number | null
  ) => void;
  removeEdge: (vertexOne: IVertex<Data>, vertexTwo: IVertex<Data>) => void;
  print: () => void;
  DFS: (
    currentVertex: IVertex<Data>,
    searched: IVertex<Data>,
    visitedVertices: IVertex<Data>[]
  ) => IVertex<Data> | null;
  BFS: (vertex: IVertex<Data>, searched: IVertex<Data>) => void;
}
