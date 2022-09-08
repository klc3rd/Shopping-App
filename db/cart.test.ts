import {
  vi,
  describe,
  test,
  expect,
  afterAll,
  beforeAll,
  afterEach,
} from "vitest";
import prisma from "./prisma";

import { createUser } from "./users";
import {
  addItemToCart,
  deleteOneFromCart,
  deleteAllFromCart,
  getCartItems,
} from "./cart";

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

const productID = [62756349, 95224249, 63457828, 42529633];

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

afterEach(async () => {
  // delete all added cart items after each test
  productID.map(
    async (id) => await prisma.cart.deleteMany({ where: { product: id } })
  );
});

afterAll(async () => {
  // delete temp user after all tests
  await prisma.user.delete({ where: { email: newUser.email } });
});

describe("addItemToCart()", () => {
  test("Should add item to cart", async () => {
    const result = await addItemToCart(productID[0], foundUser, { prisma });

    expect(result).not.toBe({
      id: expect.any(Number),
      product: productID[0],
      userID: foundUser,
    });
  });
});

describe("deleteOneFromCart()", () => {
  test("If two of a product is added, function should delete one of the items", async () => {
    await addItemToCart(productID[1], foundUser, { prisma });
    await addItemToCart(productID[1], foundUser, { prisma });

    await deleteOneFromCart(productID[1], foundUser, { prisma });

    const items = await prisma.cart.findMany({
      where: { product: productID[1] },
    });

    expect(items.length).toBe(1);
  });
});

describe("deleteAllFromCart()", () => {
  test("If several of a product is added, function should delete all of these items", async () => {
    await addItemToCart(productID[2], foundUser, { prisma });
    await addItemToCart(productID[2], foundUser, { prisma });
    await addItemToCart(productID[2], foundUser, { prisma });

    await deleteAllFromCart(productID[2], foundUser, { prisma });

    const items = await prisma.cart.findMany({
      where: { product: productID[2] },
    });

    expect(items.length).toBe(0);
  });
});

describe("getCartItems()", () => {
  test("Should retrieve cart items and quantities from cart", async () => {
    await addItemToCart(productID[3], foundUser, { prisma });
    await addItemToCart(productID[3], foundUser, { prisma });
    await addItemToCart(productID[3], foundUser, { prisma });

    const response = await getCartItems(foundUser, { prisma });

    expect(response[productID[3]]).toBe(3);
  });
});
