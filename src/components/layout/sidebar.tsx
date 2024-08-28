import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routers/admin.route";
import { facultyPaths } from "../../routers/faculty.route";
import { studentPaths } from "../../routers/student.route";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
export default function Sidebar() {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  let sidebarItems;
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, `/${user!.role}`);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemGenerator(facultyPaths, `/${user!.role}`);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemGenerator(studentPaths, `/${user!.role}`);
      break;

    default:
      return <Navigate to="/login" />;
  }
  const selectedKey = location.pathname;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      onBreakpoint={() => {}}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          height: "4rem",
          justifyContent: "center",
        }}
      >
        <h1>Ph Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={sidebarItems}
      />
    </Sider>
  );
}
