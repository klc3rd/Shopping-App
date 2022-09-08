import { IContext } from "graph";
import { IProduct } from "Product";

import { addItemToCart } from "../../../../../db/cart";

interface ReturnProduct {
  error?: string;
  product?: IProduct;
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

  const product = await addItemToCart(productID, session.user.id, { prisma });

  return {
    product,
  };
};
