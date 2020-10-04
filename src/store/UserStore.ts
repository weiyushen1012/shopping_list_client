import { makeAutoObservable } from 'mobx';

export type LoginValuesType = {
  email: string;
  password: string;
};

type LoginSuccessMessage = {
  token: string;
};

const endpoint = 'http://localhost:5000/login';

export class UserStore {
  token: string = '';
  loggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (values: LoginValuesType) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const message: LoginSuccessMessage = await response.json();
      this.token = message.token;

      this.loggedIn = true;

      console.log(this);
    } catch (e) {
      console.error(e);
    }
  };
}

export const userStore = new UserStore();
