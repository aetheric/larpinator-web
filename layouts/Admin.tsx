import React from "react";

import { Button, Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Header, Content, Sider } = Layout;
import styles from "styles/components/Layout.module.css";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
export default function Admin({ children, ...rest }: any) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
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
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="sub1" icon={<UserOutlined />}>
              <a href="/admin/login">Login</a>
            </Menu.Item>
            <Menu.Item key="sub2" icon={<LaptopOutlined />}>
              <a href="/admin/players">Manage Players</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
