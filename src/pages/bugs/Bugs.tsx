import { useState } from "react";
import moment from "moment";
import qs from "qs";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Tag,
  message,
  Popconfirm,
  notification,
} from "antd";
import { ActionHeader } from "components";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useBugsData, useAddBug, useDeleteBug } from "hooks/query/bugs";

const { Option } = Select;

const Bugs = () => {
  const [form] = Form.useForm();
  const deleteBug = useDeleteBug();
  const addBug = useAddBug();
  const [visible, setVisible] = useState(false);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  // Retrieve bugs by parameters
  const query = qs.stringify(
    {
      pagination: {
        page: currentPaginationPage,
        pageSize: 10,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  // Get bugs
  const { data: bugsData, isLoading } = useBugsData(
    currentPaginationPage,
    query
  );

  // Columns for table
  const columns = [
    {
      width: 100,
      title: "Prefix",
      render: (_, { id }) => <span>BG-{id}</span>,
    },
    {
      title: "Bug",
      dataIndex: ["attributes", "name"],
      render: (name, { id }) => <Link to={`/bugs/${id}`}>{name}</Link>,
    },
    {
      title: "Status",
      dataIndex: ["attributes", "status"],
      render: (status) => {
        if (status === "open") {
          return <Tag color="green">Open</Tag>;
        }
        if (status === "testing") {
          return <Tag color="cyan">Testing</Tag>;
        }
        if (status === "closed") {
          return <Tag color="red">Closed</Tag>;
        }
      },
    },
    {
      title: "Priority",
      dataIndex: ["attributes", "priority"],
      render: (status) => {
        if (status === "high") {
          return <Tag color="#ff0000">High</Tag>;
        }
        if (status === "medium") {
          return <Tag color="#ff9900">Medium</Tag>;
        }
        if (status === "low") {
          return <Tag color="#2db7f5">Low</Tag>;
        }
      },
    },
    {
      title: "Deadline",
      render: (_, record) => {
        return <>{moment(record.attributes.deadline).format("DD MMM, YYYY")}</>;
      },
    },
    {
      width: 100,
      title: "Action",
      dataIndex: "action",
      render: (status, record) => {
        return (
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDeleteBug(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];

  const handleDrawerOpen = () => {
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setVisible(false);
  };

  // Listen for table change and set pagination number
  const handleTableChange = (page) => {
    setCurrentPaginationPage(page.current);
  };

  // Delete specific bug by id
  const handleDeleteBug = async (id) => {
    message.loading({ content: "Deleting project", key: "deleteMessageKey" });

    await deleteBug.mutateAsync(id, {
      onSuccess: () => {
        message.success({
          content: "Bug is deleted",
          key: "deleteMessageKey",
        });
      },
      onError: (error) => {
        message.error({
          content: "Something is wrong",
          key: "deleteMessageKey",
        });
      },
    });
  };

  // Run on submiting form
  const onFinish = async (values: any) => {
    message.loading({ content: "Creating new project", key: "newBugKey" });
    await addBug.mutateAsync(values, {
      onSuccess: () => {
        message.success({
          content: "Project is created",
          key: "newBugKey",
        });
        handleDrawerClose();
      },
      onError: (error) => {
        const messageContent =
          error instanceof Error ? error.message : "Error in creating project";
        notification.error({
          message: messageContent,
          description: messageContent,
        });
        message.error({ content: "Something is wrong!", key: "newBugKey" });
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ActionHeader
        title="Bugs"
        subTitle="All bugs"
        drawerTitle="Add new bug"
        visible={visible}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter bug name" }]}
              >
                <Input placeholder="Please enter bug name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please choose status" }]}
              >
                <Select placeholder="Please choose status">
                  <Option value="active">Active</Option>
                  <Option value="testing">Testing</Option>
                  <Option value="closed">Closed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </ActionHeader>
      <Table
        scroll={{ x: 600 }}
        rowKey={(record) => record.id}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: 1,
          current: currentPaginationPage,
          pageSize: bugsData?.meta.pagination.pageSize,
          total: bugsData?.meta.pagination.total,
        }}
        dataSource={bugsData?.data}
        bordered={false}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Bugs;
