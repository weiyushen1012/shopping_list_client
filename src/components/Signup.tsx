import React from 'react';
import CSS from 'csstype';
import { Form, Input, Button, Alert } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { LoginValuesType, userStore, UserStore } from '../store/UserStore';
import { observer } from 'mobx-react';

type StoreType = {
  userStore: UserStore;
};

const Signup = observer(
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
      width: isSmallScreen ? 'auto' : '500px',
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
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
);

export default () => <Signup userStore={userStore} />;
