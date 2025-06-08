export type TPath = (section: number, path?: string) => string;

export function getTPath(page: string): TPath {
  return function (section: number, path: string = "") {
    return `guide.pages.${page}.section${section}${path ? `.${path}` : ""}`;
  };
}
