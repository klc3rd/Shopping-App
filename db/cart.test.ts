import { vi, describe, test, expect, afterAll, beforeAll } from "vitest";
import prisma from "./prisma";

import { createUser } from "./users";
import { addItemToCart, deleteOneFromCart, deleteAllFromCart } from "./cart";
import { text } from "node:stream/consumers";

// Disable mailer function so tests don't send unnecessary emails or cause
// error thrown due to environment variables not being implementedß
vi.mock("../utils/mailer");

// Create a user then get result and save user ID
const newUser = {
  name: "qpPAMgE3BPyNCUT4",
  username: "vhHNFUkTzQ6KHnJnKRKWACSn65FPAE35",
  email: "test@kvfi2yFYgaHhjNfEcnyMuJcCVRtKm5YZ.com",
  password: "cRsZ9bE8xkrP77YitFY2mY2CiGfACaQx",
};

// Each product ID is for a different set of tests so the test can count the number
// of removed items without interfering with each other
const productID1 = 6275634935;
const productID2 = 9522424949;
const productID3 = 6345782877;

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
  // delete created user, also delete and created cart items
  // that may not have been removed
  await prisma.cart.deleteMany({ where: { product: productID1 } });
  await prisma.cart.deleteMany({ where: { product: productID2 } });
  await prisma.cart.deleteMany({ where: { product: productID3 } });

  await prisma.user.delete({ where: { email: newUser.email } });
});

describe("addItemToCart()", () => {
  test("Should add item to cart", async () => {
    const result = await addItemToCart(productID1, foundUser, { prisma });

    expect(result).not.toBe({
      id: expect.any(Number),
      product: productID1,
      userID: foundUser,
    });
  });
});

describe("deleteOneFromCart()", () => {
  test("If two of a product is added, function should delete one of the items", async () => {
    await addItemToCart(productID2, foundUser, { prisma });
    await addItemToCart(productID2, foundUser, { prisma });

    await deleteOneFromCart(productID2, foundUser, { prisma });

    const items = await prisma.cart.findMany({
      where: { product: productID2 },
    });

    expect(items.length).toBe(1);
  });
});

describe("deleteAllFromCart()", () => {
  test("If several of a product is added, function should delete all of these items", async () => {
    await addItemToCart(productID3, foundUser, { prisma });
    await addItemToCart(productID3, foundUser, { prisma });
    await addItemToCart(productID3, foundUser, { prisma });

    await deleteAllFromCart(productID3, foundUser, { prisma });

    const items = await prisma.cart.findMany({
      where: { product: productID3 },
    });

    expect(items.length).toBe(0);
  });
});
