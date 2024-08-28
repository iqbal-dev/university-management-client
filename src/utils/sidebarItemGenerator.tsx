import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPaths } from "../types";

export const sidebarItemGenerator = (
  items: TUserPaths[] = [],
  basePath: string
): TSidebarItem[] => {
  return items
    .filter((item) => item.name)
    .map((item) => {
      const currentPath = item.path ? `${basePath}/${item.path}` : basePath;

      return {
        key: currentPath,
        label: item.children?.length ? (
          item.name
        ) : (
          <NavLink to={currentPath}>{item.name}</NavLink>
        ),
        children: item.children?.length
          ? sidebarItemGenerator(item.children, currentPath)
          : undefined,
      };
    });
};
