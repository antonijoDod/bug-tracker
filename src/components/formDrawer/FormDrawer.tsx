import React, { useState } from "react";
import { Drawer } from "antd";

const FormDrawer = ({ title, visible, children, ...rest }) => {
  return (
    <Drawer
      title={title}
      width={720}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default FormDrawer;
