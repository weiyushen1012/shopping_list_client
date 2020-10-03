import React from 'react';
import CSS from 'csstype';
import { PageHeader, Button } from 'antd';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Navbar(): JSX.Element {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const buttonStyle: CSS.Properties = {
    width: '120px',
  };

  return (
    <PageHeader
      onBack={() => window.history.back()}
      className="site-page-header"
      title="Shopping List"
      subTitle={isSmallScreen ? '' : 'Make your shopping plan smarter'}
      extra={[
        <Button key="1" style={buttonStyle} href="/login">
          Login
        </Button>,
      ]}
    />
  );
}

export default Navbar;
