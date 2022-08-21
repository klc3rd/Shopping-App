import { IContext } from "graph";
import { createUser } from "../../../../db/users";
import { IUser } from "Users";

interface IReturnUser {
  error?: string;
  user: IUser | null;
}

export const User = {
  User: () => {},
};

export const userCreate = async (
  _: any,
  { name, username, email, password }: IUser,
  { prisma }: IContext
): Promise<IReturnUser> => {
  return createUser({ name, username, email, password }, { prisma });
};
