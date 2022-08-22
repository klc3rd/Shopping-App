import validator from "validator";
import bcrypt from "bcrypt";
import { IContext } from "graph";
import { IUser, ILogin } from "Users";
import { v4 as uuid } from "uuid";

import mailer from "../utils/mailer";

// create user function is separated from mutation for testing reasons
export const createUser = async (
  { name, username, email, password }: IUser,
  { prisma }: IContext
) => {
  if (!validator.isEmail(email)) {
    return {
      error: "Enter a valid email",
      user: null,
    };
  }

  if (!validator.isLength(password!, { min: 8 })) {
    return {
      error: "Password must be at least 8 characters",
      user: null,
    };
  }

  // generate password hash
  const passwordHash = await bcrypt.hash(password!, 10);
  const verifyVal = uuid();

  // Add user
  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: passwordHash,
      verified: false,
      verifyVal,
      resetVal: "",
      role: "user",
    },
  });

  mailer(email, verifyVal);

  const returnUser = {
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
  };

  return { user: returnUser };
};

export const login = async (
  { email, password }: ILogin,
  { prisma }: IContext
) => {
  // find user and grab hash
  const user = await prisma.user.findUnique({ where: { email: email } });
  const passwordHash = user.password;

  const match = await bcrypt.compare(password, passwordHash);

  if (!user || !match) {
    return {
      error: "Invalid login",
      user: null,
    };
  }

  const returnUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };

  return {
    error: null,
    user: returnUser,
  };
};

export const getUserByEmail = async (email: string, { prisma }: IContext) => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return {
      error: "Could not find user",
      user: null,
    };
  }

  const returnUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };

  return {
    error: null,
    user: returnUser,
  };
};
