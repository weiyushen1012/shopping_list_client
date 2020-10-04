import React from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CSS from 'csstype';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = (): JSX.Element => {
  const AppStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  return (
    <div style={AppStyle}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
