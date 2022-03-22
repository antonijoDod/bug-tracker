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
import {
  useProjectsData,
  useDeleteProject,
  useAddProject,
} from "hooks/query/projects";

const { Option } = Select;

const ProjectsPage = () => {
  const [form] = Form.useForm();
  const deleteProject = useDeleteProject();
  const addProject = useAddProject();
  const [visible, setVisible] = useState(false);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  // Retrieve projects by parameters
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

  // Get projects
  const { data: projectsData, isLoading } = useProjectsData(
    currentPaginationPage,
    query
  );

  // Columns for table
  const columns = [
    {
      width: 100,
      title: "Prefix",
      render: (_, { id }) => <span>PR-{id}</span>,
    },
    {
      title: "Project name",
      dataIndex: ["attributes", "name"],
      key: "name",
      render: (name, { id }) => <Link to={`/projects/${id}/bugs`}>{name}</Link>,
    },
    {
      title: "Status",
      dataIndex: ["attributes", "status"],
      key: "status",
      render: (status) => {
        if (status === "active") {
          return <Tag color="green">Active</Tag>;
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
      title: "Created",
      key: "createdAt",
      render: (_, record) => {
        return (
          <>{moment(record.attributes.createdAt).format("DD MMM, YYYY")}</>
        );
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
            onConfirm={() => handleDeleteProject(record.id)}
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

  // Delete specific project by id
  const handleDeleteProject = async (id) => {
    message.loading({ content: "Deleting project", key: "deleteMessageKey" });

    await deleteProject.mutateAsync(id, {
      onSuccess: () => {
        message.success({
          content: "Project is deleted",
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
    message.loading({ content: "Creating new project", key: "newProjectKey" });
    await addProject.mutateAsync(values, {
      onSuccess: () => {
        message.success({
          content: "Project is created",
          key: "newProjectKey",
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
        message.error({ content: "Something is wrong!", key: "newProjectKey" });
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ActionHeader
        title="Projects"
        subTitle="All projects"
        drawerTitle="Add new project"
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
                rules={[
                  { required: true, message: "Please enter project name" },
                ]}
              >
                <Input placeholder="Please enter project name" />
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
        rowKey={(record) => record.id}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: 1,
          current: currentPaginationPage,
          pageSize: projectsData?.meta.pagination.pageSize,
          total: projectsData?.meta.pagination.total,
        }}
        dataSource={projectsData?.data}
        bordered={false}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProjectsPage;
