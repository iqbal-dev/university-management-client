import { TRoute, TUserPaths } from "../types";

export const routesGenerator = (
  items: TUserPaths[],
  basePath: string
): TRoute[] => {
  let routes: TRoute[] = [];

  items.forEach((item) => {
    const currentPath = item.path ? `${basePath}/${item.path}` : basePath;

    if (item.path && item.element) {
      routes.push({
        path: item.index ? "" : currentPath,
        element: item.element,
        index: item.index || false,
      });
    }

    if (item.children) {
      routes = routes.concat(routesGenerator(item.children, currentPath));
    }
  });

  return routes;
};
