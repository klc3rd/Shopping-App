import { IContext } from "graph";
import { createUser } from "../../../../../db/users";
import bcrypt from "bcrypt";

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

export const userUpdatePassword = async (
  _: any,
  { password }: { password: string },
  { prisma, session }: IContext
) => {
  const hash = await bcrypt.hash(password, 10);
  if (!session) {
    return "You are not logged in!";
  }

  const id = session.user.id;

  await prisma.user.update({
    data: { password: hash },
    where: { id },
  });

  return "Password updated";
};
