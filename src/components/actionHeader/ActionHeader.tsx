import { FC } from "react";
import { PageHeader, Button, Space } from "antd";
import { FormDrawer } from "components";

interface IActionDrawer {
  title: string;
  subTitle: string;
  drawerTitle: string;
  children: any;
  visible: boolean;
  handleDrawerOpen(): void;
  handleDrawerClose(): void;
}

const ActionHeader: FC<IActionDrawer> = ({
  title,
  subTitle,
  drawerTitle,
  visible,
  children,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  return (
    <>
      <PageHeader
        ghost={false}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button key="1" type="primary" onClick={handleDrawerOpen}>
            New
          </Button>,
        ]}
      />
      <FormDrawer
        title={drawerTitle}
        visible={visible}
        onClose={handleDrawerClose}
        extra={
          <Space>
            <Button onClick={handleDrawerClose}>Cancel</Button>
          </Space>
        }
      >
        {children}
      </FormDrawer>
    </>
  );
};

export default ActionHeader;
