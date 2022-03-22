import React from "react";
import { Layout } from "antd";
import { SidebarMenu } from "components";
import styles from "./Sidebar.module.css";

const { Sider: AntSider } = Layout;

const Sidebar = () => {
  return (
    <AntSider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      className={styles.sidebar}
    >
      <div className={styles.logo}>
        <i className="devicon-doctrine-plain colored"></i>
        <span>Bug Tracker</span>
      </div>
      <SidebarMenu />
    </AntSider>
  );
};

export default Sidebar;
