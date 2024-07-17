import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/main-layout";
import NotFound from "../pages/NotFound";
import { routesGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: routesGenerator(adminPaths, "/admin"),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
