import { makeAutoObservable, runInAction } from 'mobx';

export type LoginValuesType = {
  email: string;
  password: string;
};

type LoginSuccessData = {
  token: string;
};

type LoginFailureData = {
  message: string;
};

const endpoint = 'http://localhost:5000/login';

export class UserStore {
  token: string = '';
  isLoggedIn: boolean = false;
  error: string = '';
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(values: LoginValuesType) {
    try {
      runInAction(() => {
        this.error = '';
        this.loading = true;
      });

      const response: Response = await fetch(endpoint, {
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
