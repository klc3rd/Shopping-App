import { IContext } from "graph";
import { getCartItems } from "../../../../db/cart";

interface Iid {
  id: number;
}

export const Query = {
  user: async (_1: any, { id }: Iid, { prisma }: IContext) => {
    const user = await prisma.user.findUnique({ where: { id: id } });

    return user;
  },

  product: async (_1: any, { id }: Iid, { prisma }: IContext) => {
    const product = await prisma.product.findUnique({ where: { id: id } });

    return product;
  },

  products: async (_1: any, { id }: Iid, { prisma }: IContext) => {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: {
        NOT: {
          quantity: 0,
        },
      },
    });

    return products;
  },

  cart: async (_1: any, _2: any, { session, prisma }: IContext) => {
    const userID = session.user.id;

    const products = await getCartItems(userID, { prisma });

    const cartReturn = [];

    for (const item in products) {
      const foundProduct = await prisma.product.findUnique({
        where: { id: parseInt(item) },
      });

      const returnObj = {
        product: foundProduct,
        quantity: products[item],
      };

      cartReturn.push(returnObj);
    }

    return cartReturn;
  },
};
