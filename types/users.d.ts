declare module "Users" {
  interface IUser {
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
