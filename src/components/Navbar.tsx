import React from 'react';
import CSS from 'csstype';
import { PageHeader, Button } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { observer } from 'mobx-react';
import { userStore, UserStore } from '../store/UserStore';
import { useHistory } from 'react-router-dom';

type StoreType = {
  userStore: UserStore;
};

const Navbar = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const history = useHistory();

    console.log(userStore.loggedIn);

    const buttonStyle: CSS.Properties = {
      width: '120px',
      display: userStore.loggedIn ? 'none' : 'block',
    };

    return (
      <PageHeader
        onBack={() => window.history.back()}
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
        ]}
      />
    );
  }
);

export default () => <Navbar userStore={userStore} />;
