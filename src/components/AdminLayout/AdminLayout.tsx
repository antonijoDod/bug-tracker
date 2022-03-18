import { useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import { useQuery } from "react-query";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./AminLayout.module.css";
import { Outlet } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { Divider, ItemGroup, SubMenu } = Menu;

const AdminLayout = () => {
  const { data, isLoading, isError } = useQuery("recentProject", async () => {
    const res = await axios("http://localhost:1337/api/projects");
    return await res.data;
  });

  return (
    <Layout className={styles.layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        className={styles.sidebar}
      >
        <div className={styles.logo}>
          <i className="devicon-doctrine-plain colored"></i>
          <span>Bug Tracker</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/projects">Projects</Link>
          </Menu.Item>
          <ItemGroup title="PREVIEW">
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link to="/bugs">Bugs</Link>
            </Menu.Item>
          </ItemGroup>
          {/*   <ItemGroup title="RECENT">
            {data?.data.map((project) => (
              <Menu.Item key={`SUB${project.id}`} icon={<UserOutlined />}>
                <Link to={`/projects/${project.id}/bugs`}>
                  {project.attributes.name}
                </Link>
              </Menu.Item>
            ))}
          </ItemGroup> */}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ padding: "0, 1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Header
            <Avatar style={{ backgroundColor: "#f56a00" }}>A</Avatar>
          </div>
        </Header>
        <Content>
          <div
            className={styles.light__background}
            style={{ padding: "1rem", height: "100%" }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Bug trucker ©2022 Created by Antonijo D
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
