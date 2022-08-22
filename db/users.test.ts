import { vi, describe, test, expect, afterAll, beforeAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import {
  createUser,
  login,
  getUserByEmail,
  validatePasswordResetValue,
} from "./users";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_TESTING,
    },
  },
});

// Disable mailer function so tests don't send unnecessary emails
vi.mock("../utils/mailer");

const newUser = {
  name: "Hoj4w3vqrZyrgR8",
  username: "How4w3vqrZyrg",
  email: "test@BLC8dSkDE2gCWgAGe7QBDvk3uF6UFRYd.com",
  password: "cRsZ9bE8xkrP77YitFY2mY2CiGfACaQx",
};

beforeAll(async () => {
  await createUser(newUser, { prisma });
});

afterAll(async () => {
  await prisma.user.delete({ where: { email: newUser.email } });
});

describe("login()", async () => {
  test("Should login user", async () => {
    const loginResponse = await login(
      { email: newUser.email, password: newUser.password },
      { prisma }
    );

    expect(loginResponse.user?.username).toBe(newUser.username);
  });

  test("Should give error if using an invalid login", async () => {
    const loginResponse = await login(
      { email: newUser.email, password: "invalid_password" },
      { prisma }
    );

    expect(loginResponse.error).toBe("Invalid login");
  });
});

describe("getUserByEmail", () => {
  test("Should retrieve a user by email", async () => {
    const getUserResponse = await getUserByEmail(newUser.email, { prisma });
    expect(getUserResponse.user?.username).toBe(newUser.username);
  });

  test("Should give an error if given an invalid email", async () => {
    const getUserResponse = await getUserByEmail("test", { prisma });
    expect(getUserResponse.error).toBe("Could not find user");
  });
});

describe("validatePasswordResetValue()", () => {
  test("Should return false when given incorrect value", async () => {
    const response = await validatePasswordResetValue("incorrect_value", {
      prisma,
    });

    expect(response).toBeFalsy();
  });

  test("Should return true when given a correct value", async () => {
    const testValue = "TEST_VALUE";
    await prisma.user.update({
      where: { email: newUser.email },
      data: { resetVal: testValue },
    });

    const response = await validatePasswordResetValue(testValue, {
      prisma,
    });

    expect(response).toBeTruthy();
  });
});
