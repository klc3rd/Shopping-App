declare module "Users" {
  interface IUser {
    id?: number;
    name: string;
    username: string;
    email: string;
    password?: string;
  }

  interface ILogin {
    email: string;
    password: string;
  }
}
