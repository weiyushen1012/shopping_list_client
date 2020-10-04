import React from 'react';
import CSS from 'csstype';
import { PageHeader, Button, Avatar } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { observer } from 'mobx-react';
import { userStore, UserStore } from '../store/UserStore';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

type StoreType = {
  userStore: UserStore;
};

const Navbar = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const history = useHistory();

    const buttonStyle: CSS.Properties = {
      width: '120px',
      display: userStore.isLoggedIn ? 'none' : 'inline',
    };

    const avatarStyle: CSS.Properties = {
      display: userStore.isLoggedIn ? 'inline-block' : 'none',
    };

    return (
      <PageHeader
        className="site-page-header"
        title="Shopping List"
        subTitle={isSmallScreen ? '' : 'Make your shopping plan smarter'}
        extra={[
          <Button
            key="1"
            style={buttonStyle}
            onClick={() => history.push('/login')}
          >
            Log In
          </Button>,
          <Button
            key="2"
            style={buttonStyle}
            type="primary"
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </Button>,
          <span key="3" style={avatarStyle}>
            <Avatar icon={<UserOutlined />} />
            {userStore.email}
          </span>,
        ]}
      />
    );
  }
);

export default () => <Navbar userStore={userStore} />;
