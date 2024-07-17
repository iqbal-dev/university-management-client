import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { adminPaths } from "../../routers/admin.route";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
const { Header, Sider, Content, Footer } = Layout;
export default function MainLayout() {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={() => {}}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
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
            defaultSelectedKeys={["4"]}
            items={sidebarItemGenerator(adminPaths, "/admin")}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
