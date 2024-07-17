import AdminDashboard from "../pages/AdminDashboard";
import CreateAdmin from "../pages/CreateAdmin";
import CreateFaculty from "../pages/CreateFaculty";
import CreateStudent from "../pages/CreateStudent";
import { TUserPaths } from "../types";

export const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    path: "user-management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
