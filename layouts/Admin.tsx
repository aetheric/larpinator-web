import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

const { Header, Sider, Content } = Layout;
import {
  faDragon,
  faUserNinja,
  faDiceD20,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Admin({ children, ...rest }: any) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="site-layout-background"
      >
        <div
          className="logo p-4"
          style={{
            background: "#139fd7",
            height: "64px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <h4 style={{ color: "#fff" }}>(current larp name)</h4>
        </div>
        <Menu
          className="larp-size-menu"
          mode="inline"
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="sub1" icon={<UserOutlined />}>
            <a href="/admin/login">Login</a>
          </Menu.Item>
          <Menu.Item key="sub2" icon={<FontAwesomeIcon icon={faUserNinja} />}>
            <a href="/admin/players">Manage Players</a>
          </Menu.Item>
          <Menu.Item key="sub3" icon={<FontAwesomeIcon icon={faDiceD20} />}>
            <a href="/admin/larps">Manage Larps</a>
          </Menu.Item>
          <Menu.Item key="sub4" icon={<FontAwesomeIcon icon={faPhotoVideo} />}>
            <a href="/admin/plots">Manage Plots</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 10 }} className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              style: { fontSize: 18 },
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ float: "right" }}
          >
            <Menu.Item key="1">
              <a href="/admin/add-larp">
                <FontAwesomeIcon icon={faDragon} />
                <span className="ml-2">Add New Larp</span>
              </a>
            </Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
