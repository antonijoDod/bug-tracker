import { FC } from "react";
import { Layout } from "antd";
import styles from "./Footer.module.css";

const { Footer: AntFooter } = Layout;

const Footer: FC = () => {
  return (
    <AntFooter className={styles.footer}>
      Bug trucker ©2022 Created by Antonijo D
    </AntFooter>
  );
};

export default Footer;
