import { describe, test, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { createUser } from "./users";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_TESTING,
    },
  },
});

const newUser = {
  name: "Hoj4w3vqrZyrgR8",
  username: "How4w3vqrZyrg",
  email: "test@BLC8dSkDE2gCWgAGe7QBDvk3uF6UFRYd.com",
  password: "cRsZ9bE8xkrP77YitFY2mY2CiGfACaQx",
};

afterAll(async () => {
  await prisma.user.delete({ where: { email: newUser.email } });
});

describe("createUser()", async () => {
  test("Should create a user", async () => {
    const response = await createUser(newUser, { prisma });

    expect(response.user!.name).toBe(newUser.name);
  });
});
