import React from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;

const CommentEditor = ({ onFinish, submitting, value }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="message">
          <TextArea rows={4} value={value} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommentEditor;
