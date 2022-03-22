import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { ItemGroup } = Menu;

const SidebarMenu = () => {
  return (
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
    </Menu>
  );
};

export default SidebarMenu;
