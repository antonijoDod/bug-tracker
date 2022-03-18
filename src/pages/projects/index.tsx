import { useState } from "react";
import moment from "moment";
import qs from "qs";
import {
  Table,
  PageHeader,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
  Tag,
  message,
  Popconfirm,
} from "antd";
import { FormDrawer } from "components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useProjects } from "query/projects";

const { Option } = Select;

const ProjectsPage = () => {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

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

  const { data, isLoading } = useProjects(1, query);

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

  const handleDrawerVisibility = () => {
    setVisible(true);
  };

  const handleCloseDrawerVisibility = () => {
    setVisible(false);
  };

  const handleTableChange = (e) => {
    setCurrentPaginationPage(e.current);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject.mutateAsync(id);
  };

  const deleteProject = useMutation(
    async (id) =>
      await axios.delete(`http://localhost:1337/api/projects/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        message.success("Project is deleted");
        handleCloseDrawerVisibility();
      },
    }
  );

  const addProject = useMutation(
    async (data) =>
      await axios.post("http://localhost:1337/api/projects", { data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        message.success("New project is created");
        handleCloseDrawerVisibility();
      },
    }
  );

  const onFinish = async (values: any) => {
    await addProject.mutateAsync(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Projects"
        subTitle="Your all projects"
        extra={[
          <Button key="1" type="primary" onClick={handleDrawerVisibility}>
            New project
          </Button>,
        ]}
      ></PageHeader>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: 1,
          current: currentPaginationPage,
          pageSize: data?.meta.pagination.pageSize,
          total: data?.meta.pagination.total,
        }}
        dataSource={data?.data}
        bordered={false}
        onChange={handleTableChange}
      />
      <FormDrawer
        title="Create new project"
        visible={visible}
        onClose={handleCloseDrawerVisibility}
        extra={
          <Space>
            <Button onClick={handleCloseDrawerVisibility}>Cancel</Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
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
              <Form.Item name="prefix" label="Project prefix">
                <Input
                  style={{ width: "100%" }}
                  addonBefore="PB"
                  placeholder="Please enter project number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: "Please choose the date" }]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
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
      </FormDrawer>
    </>
  );
};

export default ProjectsPage;
