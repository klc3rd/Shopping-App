import { IContext } from "graph";
import { IProduct } from "Product";

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
