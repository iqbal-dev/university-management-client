import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
  index: boolean;
};

export type TUserPaths = {
  name?: string;
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: TUserPaths[];
};
