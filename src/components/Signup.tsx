import React from 'react';
import CSS from 'csstype';
import { Form, Input, Button, Alert } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';
import {
  AuthenticationValuesType,
  userStore,
  UserStore,
} from '../stores/UserStore';
import { observer } from 'mobx-react';

type StoreType = {
  userStore: UserStore;
};

const Signup = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const SignupPageStyle: CSS.Properties = {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
    };

    const SignupFormStyle: CSS.Properties = {
      width: isSmallScreen ? '100%' : '400px',
      paddingLeft: isSmallScreen ? '1em' : 0,
      paddingRight: isSmallScreen ? '1em' : 0,
      marginBottom: '10em',
    };

    const SignupFormButtonStyle: CSS.Properties = {
      width: '100%',
      marginTop: '2em',
    };

    const alertStyles: CSS.Properties = {
      display: !!userStore.error ? 'block' : 'none',
      marginBottom: '1em',
    };

    async function handleFinish(values: AuthenticationValuesType) {
      await userStore.signup(values);
    }

    return (
      <div style={SignupPageStyle}>
        <div style={SignupFormStyle}>
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
                style={SignupFormButtonStyle}
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
