import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPaths } from "../types";

export const sidebarItemGenerator = (
  items: TUserPaths[],
  basePath: string
): TSidebarItem[] => {
  return items.map((item) => {
    const currentPath = item.path ? `${basePath}/${item.path}` : basePath;

    if (!item.children) {
      return {
        key: currentPath,
        label: <NavLink to={currentPath}>{item.name}</NavLink>,
      };
    }

    return {
      key: currentPath,
      label: item.name,
      children: sidebarItemGenerator(item.children, currentPath),
    };
  }) as TSidebarItem[];
};
