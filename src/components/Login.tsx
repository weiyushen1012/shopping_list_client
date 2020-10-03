import React from 'react';
import CSS from 'csstype';
import { Form, Input, Button } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';

type LoginValuesType = {
  email: string;
  password: string;
};

function Login(): JSX.Element {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const LoginPageStyle: CSS.Properties = {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  };

  const LoginFormStyle: CSS.Properties = {
    width: isSmallScreen ? 'auto' : '500px',
    marginBottom: '10em',
  };

  const LoginFormButtonStyle: CSS.Properties = {
    width: '120px',
  };

  async function handleFinish(values: LoginValuesType) {
    const endpoint = 'http://localhost:5000/login';

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const message = await response.json();

    console.log(message);
  }

  return (
    <div style={LoginPageStyle}>
      <div style={LoginFormStyle}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: isSmallScreen ? 0 : 5,
              span: isSmallScreen ? 25 : 20,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={LoginFormButtonStyle}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
