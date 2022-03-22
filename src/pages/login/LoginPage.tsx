import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import styles from "./LoginPage.module.css";
import { useAuth } from "lib/auth";
import { useNavigate } from "react-router-dom";

interface IForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();
  const onFinish = async (values: IForm) => {
    try {
      const res = await login({
        identifier: values.username,
        password: values.password,
      });
      notification.success({ message: `Welcome back ${res.username}` });
      navigate("/");
    } catch (error) {
      notification.error({ message: error.response.data.error.message });
    }
  };

  const onFinishFailed = () => {};

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.illustrationWrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form
          name={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className={styles.formTitle}>Bug trucker</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoggingIn}
              className="loginFormButton"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
