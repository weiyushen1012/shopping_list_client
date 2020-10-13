import React from 'react';
import { observer } from 'mobx-react';
import { userStore, UserStore } from '../../stores/UserStore';
import {
  shoppingListStore,
  ShoppingListStore,
} from '../../stores/ShoppingListStore';

type StoreType = {
  userStore: UserStore;
  shoppingListStore: ShoppingListStore;
};

const CreateListItemModel = observer(
  ({ userStore, shoppingListStore }: StoreType): JSX.Element => {
    return <div>Create New List Item</div>;
  }
);

export default () => (
  <CreateListItemModel
    userStore={userStore}
    shoppingListStore={shoppingListStore}
  />
);
