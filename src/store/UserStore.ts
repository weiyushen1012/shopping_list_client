import { makeAutoObservable, runInAction } from 'mobx';
import { endpoint } from '../utils/configs';

export type AuthenticationValuesType = {
  email: string;
  password: string;
};

type LoginSuccessData = {
  token: string;
  email: string;
  userId: string;
};

type LoginFailureData = {
  message: string;
};

export class UserStore {
  token: string = '';
  isLoggedIn: boolean = false;
  error: string = '';
  loading: boolean = false;
  email: string | null = null;
  userId: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async signup(values: AuthenticationValuesType) {
    try {
      runInAction(() => {
        this.error = '';
        this.loading = true;
      });

      const response: Response = await fetch(`${endpoint}/add_user`, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const status = response.status;

      if (status === 200) {
        await this.login(values);
      } else {
        const errorData: LoginFailureData = await response.json();
        runInAction(() => {
          this.error = errorData.message;
          this.loading = false;
        });
      }
    } catch (e) {
      runInAction(() => {
        this.error = 'Not able to connect to server';
        this.loading = false;
      });
    }
  }

  async login(values: AuthenticationValuesType) {
    try {
      runInAction(() => {
        this.error = '';
        this.loading = true;
      });

      const response: Response = await fetch(`${endpoint}/login`, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const status = response.status;

      if (status === 200) {
        const data: LoginSuccessData = await response.json();

        runInAction(() => {
          this.token = data.token;
          this.isLoggedIn = true;
          this.loading = false;
          this.email = data.email;
          this.userId = parseInt(data.userId);
        });
      } else {
        const errorData: LoginFailureData = await response.json();
        runInAction(() => {
          this.error = errorData.message;
          this.loading = false;
        });
      }
    } catch (e) {
      runInAction(() => {
        this.error = 'Not able to connect to server';
        this.loading = false;
      });
    }
  }
}

export const userStore = new UserStore();
