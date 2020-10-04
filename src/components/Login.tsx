import React from 'react';
import CSS from 'csstype';
import { Form, Input, Button, Alert } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { LoginValuesType, userStore, UserStore } from '../store/UserStore';
import { observer } from 'mobx-react';

type StoreType = {
  userStore: UserStore;
};

const Login = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const LoginPageStyle: CSS.Properties = {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
    };

    const LoginFormStyle: CSS.Properties = {
      width: isSmallScreen ? 'auto' : '400px',
      marginBottom: '10em',
    };

    const LoginFormButtonStyle: CSS.Properties = {
      width: '100%',
      marginTop: '2em',
    };

    const alertStyles: CSS.Properties = {
      display: !!userStore.error ? 'block' : 'none',
      marginBottom: '1em',
    };

    function handleFinish(values: LoginValuesType) {
      userStore.login(values);
    }

    return (
      <div style={LoginPageStyle}>
        <div style={LoginFormStyle}>
          <Alert
            message={userStore.error}
            type="error"
            showIcon
            style={alertStyles}
          />
          <Form layout="vertical" onFinish={handleFinish}>
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
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={LoginFormButtonStyle}
                loading={userStore.loading}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
);

export default () => <Login userStore={userStore} />;
