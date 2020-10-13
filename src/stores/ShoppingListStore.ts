import { makeAutoObservable, runInAction } from 'mobx';
import { endpoint } from '../utils/configs';
import { message } from 'antd';

class ShoppingListItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  finished: boolean;

  constructor(
    id: string,
    name: string,
    category: string,
    quantity: number,
    finished: boolean
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.finished = finished;
  }
}

type ShoppingListItemDataType = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  finished: boolean;
  created: string;
  updated: string;
};

type ShoppingList = {
  [id: string]: {
    created: Date;
    listItems: ShoppingListItem[];
  };
};

export class ShoppingListStore {
  shoppingLists: ShoppingList = {};
  activeShoppingListId: string = '';
  isCreatingNewList: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveShoppingListId(id: string) {
    runInAction(() => {
      this.activeShoppingListId = id;
    });
  }

  getActiveShoppingListItems() {
    return (
      this.shoppingLists[this.activeShoppingListId]?.listItems.map((list) => ({
        ...list,
        key: list.id,
      })) || []
    );
  }

  getShoppingListSelections() {
    return Object.keys(this.shoppingLists).map((id) => ({
      id,
      created: this.shoppingLists[id].created,
    }));
  }

  async addShoppingList(userId: number, token: string) {
    runInAction(() => {
      this.isCreatingNewList = true;
    });

    const response = await fetch(
      `${endpoint}/add_shopping_list/${userId}?token=${token}`,
      {
        method: 'POST',
      }
    );

    const newShoppingList = await response.json();

    await this.getShoppingListsAndItems(userId, token);

    this.setActiveShoppingListId(newShoppingList.id);

    message.success('New shopping list is created!', 2);

    runInAction(() => {
      this.isCreatingNewList = false;
    });
  }

  async getShoppingListsAndItems(userId: number, token: string) {
    const responseLists = await fetch(
      `${endpoint}/get_shopping_lists/${userId}?token=${token}`,
      {
        method: 'GET',
      }
    );

    const shoppingLists = await responseLists.json();

    if (!shoppingLists?.length) {
      return;
    }

    for (let shoppingList of shoppingLists) {
      const responseListItems = await fetch(
        `${endpoint}/get_shopping_list_items/${shoppingList.id}?token=${token}`,
        {
          method: 'GET',
        }
      );

      const shoppingListItemsData: ShoppingListItemDataType[] = await responseListItems.json();
      await runInAction(async () => {
        this.shoppingLists[shoppingList.id] = {
          created: new Date(shoppingList.created),
          listItems: shoppingListItemsData.map(
            (data: ShoppingListItemDataType) =>
              new ShoppingListItem(
                data.id,
                data.name,
                data.category,
                data.quantity,
                data.finished
              )
          ),
        };
      });
    }
  }
}

export const shoppingListStore = new ShoppingListStore();
