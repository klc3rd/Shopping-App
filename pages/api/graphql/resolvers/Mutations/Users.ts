import { IContext } from "graph";
import { createUser, login } from "../../../../../db/users";

import { IUser } from "Users";

interface IReturnUser {
  error?: string | null;
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

export const userUpdateName = async (
  _: any,
  { name }: IUser,
  { prisma, session }: IContext
) => {
  const id = session.user.id;
  await prisma.user.update({ data: { name }, where: { id } });

  return "Name updated";
};

export const userUpdateUsername = async (
  _: any,
  { username }: IUser,
  { prisma, session }: IContext
) => {
  const currentUser = await prisma.user.findUnique({ where: { username } });

  if (currentUser) {
    return "Username taken";
  }

  const id = session.user.id;
  await prisma.user.update({ data: { username }, where: { id } });

  return "Username updated";
};

export const userUpdateEmail = async (
  _: any,
  { email }: IUser,
  { prisma, session }: IContext
) => {
  const currentUser = await prisma.user.findUnique({ where: { email } });

  if (currentUser) {
    return "Email taken";
  }

  const id = session.user.id;
  await prisma.user.update({ data: { email }, where: { id } });

  return "Email updated";
};
