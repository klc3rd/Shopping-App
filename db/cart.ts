import { IContext } from "graph";

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
