import validator from "validator";
import bcrypt from "bcrypt";
import { IContext } from "graph";
import { IUser } from "Users";
import { v4 as uuid } from "uuid";

import mailer from "./mailer";

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
