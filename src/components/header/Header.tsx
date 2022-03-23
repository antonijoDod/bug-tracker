import React from "react";
import { Layout, Button, Space, Menu, Dropdown } from "antd";
import { useAuth } from "lib/auth";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className={styles.header} style={{ padding: "0, 1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Header
        <Space>
          {!!user && (
            <>
              <h1>{user.username}</h1>

              <Dropdown overlay={menu}>
                <Button type="primary" shape="circle">
                  {user.username[0].toUpperCase()}
                </Button>
              </Dropdown>
            </>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
