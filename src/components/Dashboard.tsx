import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { userStore, UserStore } from '../store/UserStore';

type StoreType = {
  userStore: UserStore;
};

const Dashboard = observer(
  ({ userStore }: StoreType): JSX.Element => {
    const history = useHistory();
    const isLoggedIn = userStore.isLoggedIn;

    useEffect(() => {
      if (!isLoggedIn) {
        history.push('/login');
      }
    }, [isLoggedIn, history]);

    return <div />;
  }
);

export default () => <Dashboard userStore={userStore} />;
