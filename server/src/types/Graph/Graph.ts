import {IVertex} from "./Vertex";

export interface IGraph<Data> {
  isDirected: boolean;
  isWeighted: boolean;
  vertices: IVertex<Data>[];

  addVertex: (data: Data, id: string | number) => void;
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
    searched: IVertex<Data>
  ) => IVertex<Data>[];
  BFS: (vertex: IVertex<Data>, searched: IVertex<Data>) => IVertex<Data>[];
  getShortestPath: (
    startID: string | number,
    searchedID: string | number
  ) => IVertex<Data>[];
  getVertex: (id: string | number) => IVertex<Data>;
}
