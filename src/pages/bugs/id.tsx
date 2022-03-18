import React, { useState } from "react";
import {
  PageHeader,
  Button,
  Card,
  Badge,
  Select,
  Typography,
  Descriptions,
  Comment,
  Avatar,
  Tag,
  message,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Loader, CommentList, CommentEditor } from "components";
import moment from "moment";
const { Option } = Select;
const { Paragraph, Text, Title } = Typography;

const BugPage = () => {
  const queryClient = useQueryClient();
  const { id: bugId } = useParams();
  const [messageValue, setMessageValue] = useState();
  const key = "changeBugStates";

  const { data: bugData, isLoading: bugIsLoading } = useQuery(
    "bug",
    async () => {
      const res = await axios(
        `http://localhost:1337/api/bugs/${bugId}?populate=*`
      );
      return await res.data.data;
    }
  );

  const { data: commentsData, isLoading: commentsIsLoading } = useQuery(
    "comments",
    async () => {
      const res = await axios(
        `http://localhost:1337/api/comments?populate=*&sort[0]=createdAt&filters[bug][id][$eq]=${bugId}`
      );
      return await res.data;
    }
  );

  const changeStatus = useMutation(
    async (value) => {
      const res = await axios.put(`http://localhost:1337/api/bugs/${bugId}`, {
        data: { status: value },
      });
      return await res.data;
    },
    {
      onMutate: () => {
        message.loading({ content: "Loading...", key });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("bug");
        message.success({ content: "Bug is updated", key });
      },
    }
  );

  const addComment = useMutation(
    async (message) => {
      const res = await axios.post("http://localhost:1337/api/comments", {
        data: { message, bug: bugId, author: 1 },
      });
      return await res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const handleStatusChange = (value) => {
    changeStatus.mutateAsync(value);
  };

  const handleMessageOnFinish = ({ message }) => {
    addComment.mutate(message);
  };

  if (bugIsLoading) return <Loader />;

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={bugData.attributes.name}
        subTitle={bugData.attributes.project.data.attributes.name}
        extra={[
          <Button key="1" type="primary">
            Delete bug
          </Button>,
        ]}
      />
      <Card>
        <Title level={5}>Current status</Title>
        <Select
          value={bugData.attributes.status}
          style={{ width: 120 }}
          onChange={handleStatusChange}
          bordered={false}
        >
          <Option value="open">
            <Badge status="processing" /> Open
          </Option>
          <Option value="testing">
            <Badge status="success" /> Testing
          </Option>
          <Option value="closed">
            <Badge status="error" /> Closed
          </Option>
        </Select>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <Title level={5}>Bug description</Title>
        <Paragraph>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          dolorem, earum esse ipsam recusandae corporis!
        </Paragraph>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <Descriptions title="Bug info">
          <Descriptions.Item label="Status">
            {bugData.attributes.status === "open" && (
              <Tag color="#2db7f5">Open</Tag>
            )}
            {bugData.attributes.status === "testing" && (
              <Tag icon={<SyncOutlined spin />} color="success">
                Testing
              </Tag>
            )}
            {bugData.attributes.status === "closed" && (
              <Tag color="#f50">Closed</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Deadline">
            {moment(bugData.attributes.deadline).format("DD MMM, YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            {bugData.attributes.priority === "high" && (
              <Tag color="#f50">High</Tag>
            )}
            {bugData.attributes.priority === "medium" && (
              <Tag color="orange">Medium</Tag>
            )}
            {bugData.attributes.priority === "low" && (
              <Tag color="blue">Low</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <Title level={5}>Comments</Title>
        {commentsData.data?.length > 0 && (
          <CommentList
            comments={commentsData}
            commentsIsLoading={commentsIsLoading}
          />
        )}
        <Comment
          avatar={<Avatar />}
          content={
            <CommentEditor
              onFinish={handleMessageOnFinish}
              submitting={addComment.isLoading}
              value={messageValue}
            />
          }
        />
      </Card>
    </>
  );
};

export default BugPage;
