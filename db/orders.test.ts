import { vi, describe, test, expect, afterAll, beforeAll } from "vitest";
import prisma from "./prisma";
import { IOrders } from "Orders";

import { createUser } from "./users";
import { createOrder } from "./orders";

// Disable mailer function so tests don't send unnecessary emails or cause
// error thrown due to environment variables not being implementedß
vi.mock("../utils/mailer");

const newUser = {
  name: "xKvE7iVkbcaJ",
  username: "P9Ga9a6YpzM4",
  email: "test@xXjeBYNyNB69ffh5U9gWSHpoELSNWVzv.com",
  password: "cRsZ9bE8xkrP77YitFY2mY2CiGfACaQx",
};

let foundUser: number;

beforeAll(async () => {
  await createUser(newUser, { prisma });

  // get user
  const user = await prisma.user.findUnique({
    where: {
      email: newUser.email,
    },
  });
  foundUser = user!.id;
});

afterAll(async () => {
  await prisma.user.delete({ where: { email: newUser.email } });
  await prisma.orders.deleteMany({ where: { sellerId: foundUser } });
});

describe("createOrder()", () => {
  test("should insert an order", async () => {
    const newOrder: IOrders = {
      sellerId: foundUser,
      buyerId: foundUser,
      items: [1, 2, 3],
      total: 100.0,
      address1: "123 North 1st St",
      address2: "",
      city: "City",
      state: "CA",
      zip: 12345,
      ccNumber: 123456789012345,
      expMonth: 10,
      expYear: 25,
      cvv: 231,
    };

    const response = await createOrder(newOrder, { prisma });
    expect(parseInt(response.ccNumber)).to.equal(123456789012345);
  });
});
