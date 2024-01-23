import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const ResetPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Title level={2} className="mb-1">
        Reset Password
      </Title>
      <Text type="secondary" className="mb-4">
        Enter your new password.
      </Text>
      <Form
        name="normal_login"
        className="login-form mt-4"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
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

export default ResetPassword;
