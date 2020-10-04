import React, { useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CSS from 'csstype';
import { Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { userStore, UserStore } from './store/UserStore';
import { observer } from 'mobx-react';

type StoreType = {
  userStore: UserStore;
};

const App = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const history = useHistory();

    const AppStyle: CSS.Properties = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    };

    const isLoggedIn: boolean = userStore.isLoggedIn;

    useEffect(() => {
      if (isLoggedIn) {
        history.push('/dashboard');
      }
    }, [history, isLoggedIn]);

    return (
      <div style={AppStyle}>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
);

export default () => <App userStore={userStore} />;
