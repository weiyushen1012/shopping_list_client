import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { userStore, UserStore } from '../stores/UserStore';
import { Table, Select, Button, Modal, Progress } from 'antd';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import {
  ShoppingListStore,
  shoppingListStore,
} from '../stores/ShoppingListStore';
import {
  SMALL_SCREEN_WIDTH,
  useMediaQuery,
  VERY_SMALL_SCREEN_WIDTH,
} from '../hooks/useMediaQuery';
import { formatDateTime } from '../utils/dateFormatter';
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
    const isVerySmallScreen = useMediaQuery(
      `(max-width: ${VERY_SMALL_SCREEN_WIDTH}px)`
    );
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
      marginTop: '1em',
      marginBottom: '1em',
      display: 'flex',
      flexDirection: isSmallScreen ? 'column' : 'row',
    };

    const selectStyles: CSS.Properties = {
      flexGrow: 1,
      maxWidth: '500px',
      marginRight: '1em',
    };

    const buttonGroupStyles: CSS.Properties = {
      marginTop: isSmallScreen ? '1em' : '0',
      display: 'flex',
      flexFlow: 'wrap',
    };

    useEffect(() => {
      if (!isLoggedIn) {
        history.push('/login');
      }
    }, [isLoggedIn, history]);

    useEffect(() => {
      shoppingListStore.getShoppingListsAndItems(
        userStore.userId,
        userStore.token
      );
    }, [shoppingListStore, userStore]);

    const handleActiveShoppingListChange = (id: string): void => {
      shoppingListStore.setActiveShoppingListId(id);
    };

    return (
      <div style={dashboardStyles}>
        <div style={toolBarStyles}>
          <Select
            value={formatDateTime(
              shoppingListStore.shoppingLists[
                shoppingListStore.activeShoppingListId
              ]?.created
            )}
            onChange={handleActiveShoppingListChange}
            style={selectStyles}
          >
            {shoppingListStore.getShoppingListSelections().map((data) => (
              <Option key={data.id} value={data.id}>
                {formatDateTime(data.created)}
              </Option>
            ))}
          </Select>
          <div style={buttonGroupStyles}>
            <Button
              type="dashed"
              style={{ marginRight: '1em' }}
              onClick={() =>
                shoppingListStore.addShoppingList(
                  userStore.userId,
                  userStore.token
                )
              }
              loading={shoppingListStore.isCreatingNewList}
            >
              <PlusOutlined /> {isVerySmallScreen ? '' : 'New List'}
            </Button>

            <Button
              type="dashed"
              style={{ marginRight: '1em' }}
              danger
              disabled
            >
              <DeleteFilled /> {isVerySmallScreen ? '' : 'Delete List'}
            </Button>

            <Button type="primary" onClick={() => setNewListModelVisible(true)}>
              Add Item
            </Button>
          </div>
        </div>
        <Progress percent={0} />
        <Table
          pagination={false}
          columns={columns}
          dataSource={shoppingListStore.getActiveShoppingListItems()}
          size="middle"
        />
        <Modal
          title={formatDateTime(new Date())}
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
