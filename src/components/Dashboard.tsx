import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { userStore, UserStore } from '../store/UserStore';
import { Table, Select, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ShoppingListStore,
  shoppingListStore,
} from '../store/ShoppingListStore';
import { SMALL_SCREEN_WIDTH, useMediaQuery } from '../hooks/useMediaQuery';
import { formatDate } from '../utils/dateFormatter';
import CreateListModel from './Dashboard/CreateListItemModal';

const { Option } = Select;

type StoreType = {
  userStore: UserStore;
  shoppingListStore: ShoppingListStore;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
];

const Dashboard = observer(
  ({ userStore, shoppingListStore }: StoreType): JSX.Element => {
    const history = useHistory();
    const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN_WIDTH}px)`);
    const isLoggedIn = userStore.isLoggedIn;
    const [newListModelVisible, setNewListModelVisible] = useState<boolean>(
      false
    );

    const dashboardStyles: CSS.Properties = {
      paddingLeft: '1em',
      paddingRight: '1em',
      background: '#fafafa',
      flexGrow: 1,
    };

    const toolBarStyles: CSS.Properties = {
      marginTop: '2em',
      display: 'flex',
    };

    const selectStyles: CSS.Properties = {
      flexGrow: 1,
      maxWidth: '500px',
      marginRight: '1em',
    };

    useEffect(() => {
      if (!isLoggedIn) {
        history.push('/login');
      }
    }, [isLoggedIn, history]);

    useEffect(() => {
      shoppingListStore.loadSoppingLists(userStore.userId, userStore.token);
    }, [shoppingListStore, userStore]);

    const handleActiveShoppingListChange = (id: string): void => {
      shoppingListStore.setActiveShoppingListId(id);
    };

    return (
      <div style={dashboardStyles}>
        <div style={toolBarStyles}>
          <Select
            onChange={handleActiveShoppingListChange}
            style={selectStyles}
          >
            {shoppingListStore.getShoppingListSelections().map((data) => (
              <Option key={data.id} value={data.id}>
                {formatDate(data.created)}
              </Option>
            ))}
          </Select>
          <Button type="dashed" onClick={() => setNewListModelVisible(true)}>
            <PlusOutlined /> {!isSmallScreen && 'Create New List'}
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={shoppingListStore.getActiveShoppingListItems()}
          size="middle"
        />
        <Modal
          title={formatDate(new Date())}
          visible={newListModelVisible}
          footer={[]}
          onCancel={() => setNewListModelVisible(false)}
        >
          <CreateListModel />
        </Modal>
      </div>
    );
  }
);

export default () => (
  <Dashboard userStore={userStore} shoppingListStore={shoppingListStore} />
);
