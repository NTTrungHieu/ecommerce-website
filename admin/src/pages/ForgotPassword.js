import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Title level={2} className="mb-1">
        Forgot Password
      </Title>
      <Text type="secondary" className="mb-4">
        Enter the email address associated with your account and we will send a
        link to reset your password.
      </Text>
      <Form
        name="normal_login"
        className="login-form mt-4"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="d-flex gap-1">
            Remember your password?
            <Link className="text-primary" to="/">
              Sign in
            </Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
