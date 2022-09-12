import { IContext } from "graph";

import { deleteAllFromCart, deleteOneFromCart } from "../../../../../db/cart";

import { addItemToCart } from "../../../../../db/cart";

interface ReturnProduct {
  error?: string;
  message?: string;
}

export const cartAddProduct = async (
  _: any,
  { productID }: { productID: number },
  { prisma, session }: IContext
): Promise<ReturnProduct> => {
  if (!session) {
    return {
      error: "You must be signed in",
    };
  }

  await addItemToCart(productID, session.user.id, { prisma });

  return {
    message: "Item added to cart",
  };
};

export const cartDeleteProduct = async (
  _: any,
  { productID }: { productID: number },
  { prisma, session }: IContext
): Promise<ReturnProduct> => {
  if (!session) {
    return {
      error: "You must be signed in",
    };
  }

  await deleteOneFromCart(productID, session.user.id, { prisma });

  return {
    message: "Item removed from cart",
  };
};

export const cartDeleteAllOfProduct = async (
  _: any,
  { productID }: { productID: number },
  { prisma, session }: IContext
): Promise<ReturnProduct> => {
  if (!session) {
    return {
      error: "You must be signed in",
    };
  }

  await deleteAllFromCart(productID, session.user.id, { prisma });

  return {
    message: "All of item removed from cart",
  };
};
