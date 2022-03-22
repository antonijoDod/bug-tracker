import { FC } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Footer } from "components";
import styles from "./AuthLayout.module.css";

const { Content } = Layout;

const AuthLayout: FC = () => {
  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout>
        <Header />
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
