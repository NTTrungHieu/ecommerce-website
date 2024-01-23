import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserDetails } from "../features/user/userActions";

const { Text, Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("admin");
    } else if (userToken) {
      dispatch(getUserDetails());
    }
  }, [user, userToken, navigate, dispatch]);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };
  return (
    <>
      <Title level={2} className="mb-1">
        Login
      </Title>
      <Text type="secondary" className="mb-4">
        Log in to your account to continue.
      </Text>
      <Form
        name="normal_login"
        className="login-form mt-4"
        layout="vertical"
        initialValues={{
          remember: false,
          Email: "demo@demo.com",
          Password: "demo",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          label="Email Address"
          rules={[
            {
              type: "email",
              message: "Email must be valid!",
            },
            {
              required: true,
              message: "Please enter your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter your Password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Form.Item name="Remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link
            className="login-form-forgot text-primary"
            to="/forgot-password"
          >
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
