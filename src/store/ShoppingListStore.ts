import { makeAutoObservable, runInAction } from 'mobx';
import { endpoint } from '../utils/configs';

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

  async loadSoppingLists(userId: number, token: string) {
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
      await runInAction(async () => {
        const responseListItems = await fetch(
          `${endpoint}/get_shopping_list_items/${shoppingList.id}?token=${token}`,
          {
            method: 'GET',
          }
        );

        const shoppingListItemsData: ShoppingListItemDataType[] = await responseListItems.json();

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
