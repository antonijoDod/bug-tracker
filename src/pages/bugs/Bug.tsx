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
import { useBugData, useUpdateBug } from "hooks/query/bug";
import { useCommentsData, useAddComment } from "hooks/query/comments";
import { useAuth } from "lib/auth";

const { Option } = Select;
const { Paragraph, Title } = Typography;

const Bug = () => {
  const { id: bugId } = useParams();
  const { user } = useAuth();
  const addComment = useAddComment();
  const [messageValue, setMessageValue] = useState();

  const { data: bugData, isLoading: bugIsLoading } = useBugData(bugId);

  const updateBug = useUpdateBug(bugId);

  const handleStatusChange = (value: any, more) => {
    const data: any = { status: value };
    message.loading({ content: "Loading...", key: "updateStatusKey" });
    updateBug.mutateAsync(data, {
      onSuccess: () => {
        message.success({
          content: "Status is updated",
          key: "updateStatusKey",
        });
      },
    });
  };

  const handlePriorityChange = (value: any, more) => {
    const data: any = { priority: value };
    message.loading({ content: "Loading...", key: "updatePriorityKey" });
    updateBug.mutateAsync(data, {
      onSuccess: () => {
        message.success({
          content: "Priority is updated",
          key: "updatePriorityKey",
        });
      },
    });
  };

  const { data: commentsData, isLoading: commentsIsLoading } =
    useCommentsData(bugId);

  /*   const addComment = useMutation(
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
  ); */

  const handleMessageOnFinish = ({ message }) => {
    const data: any = {
      message: message,
      author: user.id,
      bug: bugId,
    };
    addComment.mutate(data, {
      onSuccess: () => {},
    });
  };

  if (bugIsLoading) return <Loader />;

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={bugData?.data.attributes.name}
        subTitle={bugData?.data.attributes.project.data.attributes.name}
        extra={[
          <Button key="1" type="primary">
            Delete bug
          </Button>,
        ]}
      />
      <Card>
        <Title level={5}>Current status</Title>
        <Select
          value={bugData?.data.attributes.status}
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
        <Paragraph>{bugData?.data.attributes.description}</Paragraph>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <Descriptions title="Bug info">
          <Descriptions.Item label="Status">
            {bugData?.data.attributes.status === "open" && (
              <Tag color="#2db7f5">Open</Tag>
            )}
            {bugData?.data.attributes.status === "testing" && (
              <Tag icon={<SyncOutlined spin />} color="success">
                Testing
              </Tag>
            )}
            {bugData?.data.attributes.status === "closed" && (
              <Tag color="#f50">Closed</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Deadline">
            {moment(bugData?.data.attributes.deadline).format("DD MMM, YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            <Select
              value={bugData?.data.attributes.priority}
              style={{ width: 120 }}
              onChange={handlePriorityChange}
              bordered={false}
            >
              <Option value="high">
                <Tag color="#f50">High</Tag>
              </Option>
              <Option value="medium">
                <Tag color="orange">Medium</Tag>
              </Option>
              <Option value="low">
                <Tag color="blue">Low</Tag>
              </Option>
            </Select>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <Title level={5}>Comments</Title>
        {!commentsIsLoading ? (
          <>
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
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </>
  );
};

export default Bug;
