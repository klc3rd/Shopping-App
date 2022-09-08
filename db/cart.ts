import { IContext } from "graph";

interface ICart {
  id: number;
  product: number;
  userId: number;
}

export const addItemToCart = async (
  productID: number,
  userID: number,
  { prisma }: IContext
) => {
  const newItem = await prisma.cart.create({
    data: {
      product: productID,
      user: {
        connect: {
          id: userID,
        },
      },
    },
  });

  return newItem;
};

export const deleteOneFromCart = async (
  productID: number,
  userID: number,
  { prisma }: IContext
) => {
  const items = await prisma.cart.findMany({
    where: {
      product: productID,
      userId: userID,
    },
  });

  if (!items) {
    return "Item not found";
  }

  await prisma.cart.delete({
    where: {
      id: items[0].id,
    },
  });

  return "Item deleted";
};

export const deleteAllFromCart = async (
  productID: number,
  userID: number,
  { prisma }: IContext
) => {
  await prisma.cart.deleteMany({
    where: {
      product: productID,
      userId: userID,
    },
  });

  return "Item deleted";
};

export const getCartItems = async (userID: number, { prisma }: IContext) => {
  const allItems = await prisma.cart.findMany({
    where: {
      userId: userID,
    },
  });

  const cart: { [key: number]: number } = {};

  allItems.map((item: ICart) => {
    if (item.product in cart) {
      cart[item.product] = cart[item.product] + 1;
    } else {
      cart[item.product] = 1;
    }
  });

  return cart;
};
